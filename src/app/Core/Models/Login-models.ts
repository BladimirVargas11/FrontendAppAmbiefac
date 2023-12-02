export class Login {

    static DesdeObject(obj: any) {
        return new Login(
            obj.email,
            obj.password
        );
    }

    constructor(
        public email: string,
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
