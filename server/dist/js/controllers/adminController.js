"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminService_1 = __importDefault(require("../services/adminService"));
const errors_1 = __importDefault(require("../utils/errors"));
class AdminController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, role } = req.body;
                if (!username || !email || !password) {
                    res.status(400).json({ message: "Username, email, and password are required" });
                    return;
                }
                const admin = yield adminService_1.default.registerAdmin(username, email, password, role);
                res.status(201).json({ message: "Admin registered successfully", admin });
            }
            catch (error) {
                if (error instanceof errors_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "Error registering admin" });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: "Email and password are required" });
                    return;
                }
                const token = yield adminService_1.default.loginAdmin(email, password);
                res.status(200).json({ token });
            }
            catch (error) {
                if (error instanceof errors_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(401).json({ message: "Invalid email or password" });
                }
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, newPassword } = req.body;
                if (!email || !newPassword) {
                    res.status(400).json({ message: "Email and new password are required" });
                    return;
                }
                yield adminService_1.default.resetPassword(email, newPassword);
                res.status(200).json({ message: "Password reset successfully" });
            }
            catch (error) {
                if (error instanceof errors_1.default) {
                    res.status(error.statusCode).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: "Error resetting password" });
                }
            }
        });
    }
}
exports.default = new AdminController();
