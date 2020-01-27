INSERT INTO vulcan2x.transaction (
  hash,
  to_address,
  from_address,
  block_id,
  data
)
VALUES (
  ${tx.txID},
  0,
  0,  
  ${tx.block},
  ${tx.data}
)
ON CONFLICT (hash)
DO NOTHING