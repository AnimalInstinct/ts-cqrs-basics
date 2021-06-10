enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

type Person = {
  name: string;
  age: number;
  nickname: string;
  role: number;
};

const person1: Person = {
  name: "Alexander",
  age: 35,
  nickname: "",
  role: Role.ADMIN,
};

interface addNicknameProps {
  nickname: string;
  person: Person;
}

const setNickname = (props: addNicknameProps) => {
  const { person, nickname } = props;
  person.nickname = nickname;
};

setNickname({ nickname: "AnimalInstinct", person: person1 });

if (person1.role === Role.ADMIN) {
  console.log(`${person1.name} is admin`);
}
