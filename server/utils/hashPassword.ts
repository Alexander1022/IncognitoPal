import * as bcrypt from 'bcrypt';

export const Encrypt = {
    cryptPassword: (password: string) =>
        bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),

    comparePassword: (password: string, hash: string) =>
        bcrypt.compare(password, hash)
        .then(res => res)
};

export default Encrypt;