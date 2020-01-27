DROP TYPE IF EXISTS  poll CASCADE;
DROP FUNCTION IF EXISTS active_polls();

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