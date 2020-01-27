INSERT INTO polling.poll_created_event(
  creator,
  poll_id,
  start_block,
  end_block,
  multi_hash,
  log_index,
  tx_id,
  block_id
) 
VALUES(
    ${poll.creator}, 
    ${poll.pollId}, 
    to_timestamp(${poll.startDate}/1000),
    to_timestamp(${poll.endDate}/1000),
    ${poll.multiHash}, 
    ${poll.log_index},
    (select id from vulcan2x.transaction where hash=${poll.tx}),
    ${poll.block}
)
ON CONFLICT ON CONSTRAINT poll_created_event_log_index_tx_id_key
DO NOTHING