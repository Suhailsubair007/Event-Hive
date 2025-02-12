import { GetUsersByPremiumStatus } from "../../../use-cases/admin/User/GetUsers";
import { AdminLogin } from "../../../use-cases/admin/User/LoginaAdmin";
import { AdminUserController } from "../../../interface-apdaters/controllers/admin/Users/AdminUser.controller";
import { AdminUserRepository } from "../../../interface-apdaters/repositories/Admin/Users/AdminUser.repository";



const AdminUserRepo = new AdminUserRepository();

// Initialize use cases
const getUser = new GetUsersByPremiumStatus(AdminUserRepo);
const loginAdmin = new AdminLogin(AdminUserRepo);

// Initialize controller
const userController = new AdminUserController(getUser, loginAdmin);

export { userController };