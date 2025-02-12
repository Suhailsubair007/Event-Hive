import { GetUsersByPremiumStatus } from "../../../use-cases/admin/User/GetUsers";
import { AdminUserController } from "../../../interface-apdaters/controllers/admin/Users/AdminUser.controller";
import { AdminUserRepository } from "../../../interface-apdaters/repositories/Admin/Users/AdminUser.repository";

const AdminUserRepo = new AdminUserRepository();

const getUser = new GetUsersByPremiumStatus(AdminUserRepo);

const userController = new AdminUserController(getUser);

export { userController };
