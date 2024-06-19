import { Room as TRoom } from "../api/room/Room";

export const ROOM_TITLE_FIELD = "id";

export const RoomTitle = (record: TRoom): string => {
  return record.id?.toString() || String(record.id);
};
