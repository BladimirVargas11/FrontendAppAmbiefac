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
            obj.email,
            obj.password,
            obj.name
        );
    }

    constructor(
        public email: string,
        public password: string,
        public name: string
    ) { }
}
