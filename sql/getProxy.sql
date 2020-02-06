SELECT proxy FROM public.voteProxy
WHERE owner = (${owner})
LIMIT 1;