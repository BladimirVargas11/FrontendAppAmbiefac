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
