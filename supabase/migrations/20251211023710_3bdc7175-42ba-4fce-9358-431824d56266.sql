-- Create HNSW index on the embedding column for faster similarity searches
-- Using cosine distance operator class (vector_cosine_ops) for inner product similarity
CREATE INDEX IF NOT EXISTS idx_nods_page_section_embedding 
ON public.nods_page_section 
USING hnsw (embedding extensions.vector_cosine_ops)
WITH (m = 16, ef_construction = 64);