-- Step 1: Create extensions schema
CREATE SCHEMA IF NOT EXISTS extensions;

-- Step 2: Drop the embedding column (no data exists)
ALTER TABLE public.nods_page_section DROP COLUMN IF EXISTS embedding;

-- Step 3: Drop the match_page_sections function that depends on vector type
DROP FUNCTION IF EXISTS public.match_page_sections(extensions.vector, double precision, integer, integer);
DROP FUNCTION IF EXISTS public.match_page_sections(vector, double precision, integer, integer);

-- Step 4: Move the vector extension to extensions schema
ALTER EXTENSION vector SET SCHEMA extensions;

-- Step 5: Update database search path to include extensions
ALTER DATABASE postgres SET search_path TO public, extensions;

-- Step 6: Recreate the embedding column with extensions schema reference
ALTER TABLE public.nods_page_section 
ADD COLUMN embedding extensions.vector(1536);

-- Step 7: Recreate the match_page_sections function with updated references
CREATE OR REPLACE FUNCTION public.match_page_sections(
  embedding extensions.vector, 
  match_threshold double precision, 
  match_count integer, 
  min_content_length integer
)
RETURNS TABLE(id bigint, page_id bigint, slug text, heading text, content text, similarity double precision)
LANGUAGE plpgsql
SET search_path TO 'public', 'extensions', 'pg_catalog', 'pg_temp'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    public.nods_page_section.id,
    public.nods_page_section.page_id,
    public.nods_page_section.slug,
    public.nods_page_section.heading,
    public.nods_page_section.content,
    (public.nods_page_section.embedding <#> match_page_sections.embedding) * -1 AS similarity
  FROM public.nods_page_section
  WHERE length(public.nods_page_section.content) >= min_content_length
    AND (public.nods_page_section.embedding <#> match_page_sections.embedding) * -1 > match_threshold
  ORDER BY public.nods_page_section.embedding <#> match_page_sections.embedding
  LIMIT match_count;
END;
$$;

-- Step 8: Grant permissions on extensions schema
GRANT USAGE ON SCHEMA extensions TO anon, authenticated, service_role;
GRANT ALL ON SCHEMA extensions TO postgres;