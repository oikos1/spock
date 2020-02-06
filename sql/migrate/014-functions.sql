DROP TYPE IF EXISTS  poll CASCADE;
DROP FUNCTION IF EXISTS active_polls;
DROP FUNCTION IF EXISTS date_block;
DROP FUNCTION IF EXISTS current_vote;

CREATE TYPE poll AS (
	id          integer,
	creator     character varying,
	poll_id     integer,
	start_block timestamp, 
	end_block   timestamp
);

CREATE OR REPLACE FUNCTION active_polls() RETURNS setof poll as $$
  SELECT id, creator, poll_id, start_block, end_block
  FROM polling.poll_created_event
  ORDER BY id DESC
$$ LANGUAGE SQL stable;

CREATE OR REPLACE FUNCTION date_block(_date character varying) RETURNS integer as $$
  SELECT id 
  FROM vulcan2x.block
  WHERE timestamp <= CAST(_date AS DATE)
  ORDER BY id DESC	
  LIMIT 1
$$ LANGUAGE SQL stable;

CREATE OR REPLACE FUNCTION current_vote(address character varying, pollId integer) RETURNS integer as $$
  SELECT option_id
  FROM polling.voted_event
  WHERE voter = address
  AND poll_id = pollId
  ORDER BY block_id DESC	
  LIMIT 1
$$ LANGUAGE SQL stable;