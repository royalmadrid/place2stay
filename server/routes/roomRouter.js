import {Router} from 'express'

import { createRoom } from '../controllers/room.js'
import { getRooms, deleteRooms, updateRoom } from '../controllers/room.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import roomPermissions from '../middleware/permissions/room/roomPermissions.js';

const roomRouter = Router();
roomRouter.post('/', auth, createRoom);
roomRouter.get('/', getRooms);
roomRouter.delete('/:roomId', auth, checkAccess(roomPermissions.delete), deleteRooms);
roomRouter.patch('/:roomId', auth, checkAccess(roomPermissions.update), updateRoom);

export default roomRouter;