INSERT INTO polling.voted_event (
  voter,
  poll_id,
  option_id,
  log_index,
  tx_id,
  block_id
)
VALUES (
  ${vote.voter},
  ${vote.pollId},
  ${vote.optionId},
  ${vote.logIndex},
  (select id from vulcan2x.transaction where hash=${vote.tx}),
  ${vote.block}
) 
ON CONFLICT ON CONSTRAINT voted_event_log_index_tx_id_key
DO NOTHING