CREATE SCHEMA polling;
DROP TABLE IF EXISTS polling.poll_created_event;
CREATE TABLE polling.poll_created_event (
  id              serial primary key,
  creator         character varying(66) not null,
  poll_id         integer not null,
  start_block     timestamp not null,
  end_block       timestamp not null,
  multi_hash      character varying not null,
  
  log_index  integer not null,
  tx_id      integer not null REFERENCES vulcan2x.transaction(id) ON DELETE CASCADE,
  block_id   integer not null REFERENCES vulcan2x.block(id) ON DELETE CASCADE,
  unique (log_index, tx_id)
);

CREATE TABLE polling.voted_event (
  id              serial primary key,
  voter           character varying(66) not null,
  poll_id         integer not null,
  option_id       integer not null,
  
  log_index  integer not null,
  tx_id      integer not null REFERENCES vulcan2x.transaction(id) ON DELETE CASCADE,
  block_id   integer not null REFERENCES vulcan2x.block(id) ON DELETE CASCADE,
  unique (log_index, tx_id)
);

