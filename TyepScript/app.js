var Role;
(function (Role) {
    Role["ADMIN"] = "ADM";
    Role["READ_ONLY"] = "READ_ONLY";
})(Role || (Role = {}));
var person = {
    name: 'Sai',
    age: 24,
    hobbies: ['cooking', true, 1],
    role: Role.ADMIN
};
console.log('ADM' == Role['ADMIN']);
