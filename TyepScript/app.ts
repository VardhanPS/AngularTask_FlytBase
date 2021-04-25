enum Role {ADMIN = 'ADM', READ_ONLY = 'READ_ONLY'}

const person = {
    name : 'Sai',
    age : 24,
    hobbies : ['cooking', true, 1 ],
    role: Role.ADMIN
};

console.log('ADM' == Role['ADMIN']); 