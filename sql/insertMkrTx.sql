INSERT INTO mkr.transfer_event (
  sender,
  receiver,
  amount,
  log_index,
  tx_id,
  block_id
)
VALUES (
  ${tx.sender},
  ${tx.receiver},
  ${tx.value},
  ${tx.logIndex},
  (select id from vulcan2x.transaction where hash=${tx.tx}),
  ${tx.block}
) 
ON CONFLICT ON CONSTRAINT transfer_event_log_index_tx_id_key
DO NOTHING

