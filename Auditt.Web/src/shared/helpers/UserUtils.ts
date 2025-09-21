import { UserResponseModel } from "../../routes/Login/LoginModel";

export const isAdmin = (user: UserResponseModel | null) =>
	user?.roleName === "ADMIN";
export const isAdminOrInterno = (user: UserResponseModel | null) =>
	user?.roleName === "ADMIN" || user?.roleName === "AUDITOR INTERNO";

export const isAdminOrExterno = (user: UserResponseModel | null) =>
	user?.roleName === "ADMIN" || user?.roleName === "AUDITOR EXTERNO";

export const isInternoOrExterno = (user: UserResponseModel | null) =>
	user?.roleName === "AUDITOR INTERNO" || user?.roleName === "AUDITOR EXTERNO";

export const isExterno = (user: UserResponseModel | null) =>
	user?.roleName === "AUDITOR EXTERNO";

export const isInterno = (user: UserResponseModel | null) =>
	user?.roleName === "AUDITOR INTERNO";
