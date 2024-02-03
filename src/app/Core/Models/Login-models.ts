export class Login {

    static DesdeObject(obj: any) {
        return new Login(
            obj.username,
            obj.password
        );
    }

    constructor(
        public username: string,
        public password: string
    ) { }
}

export class LoginRegister {

    static DesdeObject(obj: any) {
        return new LoginRegister(
            obj.username,
            obj.email,
            obj.password,
            {fullName: obj.fullName}
        );
    }

    constructor(
        public username: string,
        public email: string,
        public password: string,
        public client: any
    ) { }
}
