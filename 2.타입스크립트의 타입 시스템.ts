{
  // 타입스크립트의 가장 중요한 역할은 "타입 시스템"에 있다.

  // Item 6️⃣. 편집기를 사용하여 타입 시스템 탐색하기(5/8)
  // 타입스크립트를 설치하면 다음 두 가지 실행
  // 1. 타입스크립트 컴파일러 tsc
  // 2. 단독으로 실행할 수 있는 타입스크립트 서버 tsserver - 언어 서비스 제공

  // 특정 시점에 TS가 값의 타입을 어떻게 이해하고 있는지 살펴보는 것 -> 타입 넓히기, 좁히기 개념을 잡기 위해 꼭 필요한 과정

  // function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  //   if (typeof elOrId === 'object') {
  //     return elOrId; // typeof null은 object임.
  //   } else if (elOrId === null) {
  //     return document.body;
  //   } else {
  //     const el = document.getElementById(elOrId);
  //     return el;
  //   }
  // }

  // 언어 서비스는 라이브러리와 라이브러리의 타입 선언을 탐색할 때 도움이 된다.
  // const response = fetch('http://example.com'); // declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;

  // Item 7️⃣. 타입이 값들의 집합이라고 생각하기(5/8)
  // 집합의 관점에서, 타입 체커의 주요 역할은 하나의 집합이 다른 집합의 부분 집합인지 검사하는 것

  // never > literal(unit) > union
  // 가장 작은 집합은 아무 값도 포함하지 않는 공집합이며, 타입스크립트에서는 never 타입이다.
  // never 타입으로 선언된 변수의 범위는 공집합이기 때문에 아무런 값도 할당할 수 없다.

  // 한 가지 값만 포함하는 타입, 리터럴literal 타입(유닛unit)

  type A = 'A';
  type B = 'B';

  // 두 개 혹은 세 개 그 이상으로 묶으려면 유니온Union 타입
  type AB = A | B;

  const c: AB = 'C';

  // 구조적 타이핑 규칙들은 어떠한 값이 다른 속성도 가질 수 있음을 의미한다.

  interface Person {
    name: string;
  }

  interface LifeSpan {
    birth: Date;
    death?: Date;
  }

  // intersection 교집합
  // intersection: 각 타입 내의 속성을 모두 포함하는 것이 일반적인 규칙

  // type PersonSpan = Person & LifeSpan;

  // 일반적으로 PersonSpan 타입을 선언하는 방법: extends 키워드 사용
  // extends: ~에 할당 가능한, ~의 부분 집합
  // PersonSpan은 Person의 부분집합
  interface PersonSpan extends Person {
    birth: Date;
    death?: Date;
  }

  const person: PersonSpan = {
    name: 'Alan Turing',
    birth: new Date('1912/06/23'),
    death: new Date('1954/06/07'),
  };

  type K = keyof (Person | LifeSpan); // never

  // keyof T : 객체의 키 타입을 반환

  const list: number[] = []; // [1]도 정상

  // Item 8️⃣. 타입 공간과 값 공간의 심벌 구분하기(5/13)
  // 타입스크립트의 심벌symbol은 타입 공간이나 값 공간 중의 한 곳에 존재한다.
  // 타입스크립트 코드에서 타입과 값은 번갈아 나올 수 있다.
  // 모든 값은 타입을 가지지만, 타입은 값을 가지지 않는다.
  // 문자열 리터럴과 문자열 리터럴 타입의 차이점을 알고 구분해야한다.

  interface Person2 {
    first: string;
    last: string;
  }

  const p: Person2 = { first: 'Jane', last: 'Jacobs' };

  function email(p: Person2, subject: string, body: string): Response {
    return;
  }

  type T1 = typeof p;
  type T2 = typeof email;

  const v1 = typeof p; // object
  const v2 = typeof email; // function

  // 타입스크립트 코드가 잘 동작하지 않는다면 타입 공간과 값 공간을 혼동해서 잘못 작성했을 가능성이 크다.

  function email1(options: { person: Person2; subject: string; body: string }) {}

  // function email1({ person, subject, body }); // JS에서는 구조분해 할당 사용 가능 (객체 내의 각 속성을 로컬 변수로 만들어줌.)

  // function email1({ oerson: Person2, subject: string, body: string }) {}

  function email1({ person, subject, body }: { person: Person2; subject: string; body: string }) {}
}
{
  // Item 9️⃣. 타입 단언보다는 타입 선언을 사용하기(5/13)
  // 모든 타입은 unknown의 서브타입이기 때문에 unknown이 포함된 단언문은 항상 동작한다.

  interface Person {
    name: string;
  }

  const alice: Person = { name: 'Alice' }; // 타입 선언
  const bob = { name: 'Bob' } as Person; // 타입 단언

  // 타입 선언: 할당되는 값이 해당 인터페이스를 만족하는 지 검사, 잉여 속성 체크 검사
  // 타입 단언: 강제로 타입을 지정, 타입 체커가 오류를 무시하도록 함.

  const people = ['alice', 'bob', 'jan'].map((name) => ({ name }));

  const people2 = ['alice', 'bob', 'jan'].map((name) => ({ name } as Person));

  const people3 = ['alice', 'bob', 'jan'].map((name) => {
    const person: Person = { name };
    return person;
  });

  // people3 코드를 좀 더 간결하게 표현
  const people4 = ['alice', 'bob', 'jan'].map((name): Person => ({ name }));

  const people5: Person[] = ['alice', 'bob', 'jan'].map((name): Person => ({ name }));
}
{
  // Item 🔟. 객체 래퍼 타입 피하기(5/13)
  // 자바스크립트에는 메서드를 가지는 String 객체 타입이 정의되어 있다.
  // 타입스크립트는 기본형과 객체 래퍼 타입을 별도로 모델링한다.
}
{
  // Item 1️⃣1️⃣. 잉여 속성 체크의 한계 인지하기
  // 잉여 속성 체크 -> 조건에 따라 동작하지 않는 다는 한계가 있다.
  // 잉여 속성 체크(== 엄격한 객체 리터럴 체크)를 이용하면
  // 1. 기본적으로 타입 시스템의 구조적 본질을 해치지 않으면서도
  // 객체 리터럴에 알 수 없는 속성을 허용하지 않는다.

  // 객체 리터럴이 아니고 타입 단언문을 사용하면 잉여 속성 체크가 적용되지 않는다.
  // 구조적 타이핑 시스템에서 허용되는 속성 이름의 오타 같은 실수를 잡는 데 효과적인 방법이다.

  interface Room {
    numDoors: number;
    ceilingHeightFt: number;
  }

  // '잉여 속성 체크' 과정 수행
  const r: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present', // 구조적 타이핑 관점으로 생각해 보면 오류가 없어야 한다.
  };

  const obj = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: 'present',
  };

  const r1: Room = obj; // 통상적인 할당 가능 검사와 함께 쓰이면 구조적 타이핑이 무엇인지 혼란스러워질 수 있다.

  // Item 1️⃣2️⃣. 함수 표현식에 타입 적용하기
  // 타입스크립트에서는 함수 표현식을 사용하는 것이 좋다.
  // 함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 함수 표현식에 재사용할 수 있다.

  function rollDice1(sides: number): number {} // 문장
  const rollDice2 = function (sides: number): number {}; // 표현식
  const rollDice3 = (sides: number): number => {}; // 표현식

  // 함수 타입 선언은 불필요한 코드의 반복을 줄인다.
  // 반복되는 함수 시그니처를 하나의 함수 타입으로 통합할 수 있다.

  type BinaryFn = (a: number, b: number) => number;
  const add: BinaryFn = (a, b) => a + b;
  const sub: BinaryFn = (a, b) => a - b;
  const mul: BinaryFn = (a, b) => a * b;
  const div: BinaryFn = (a, b) => a / b;

  // 프로미스 요청 상태 체크 함수
  async function checkedFetch(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);

    if (!response.ok) {
      // 비동기 함수 내에서는 거절된 프로미스로 변환한다.
      throw new Error(`Request failed: ${response.status}`);
    }
    return response;
  }

  // 위 코드를 좀 더 간결하게
  // 함수 표현식 전체 타입을 정의하는 것이 코드도 간결하고 안전하다.
  const checkedFetch1: typeof fetch = async (input, init) => {
    const response = await fetch(input, init);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response;
  };

  // Item 1️⃣3️⃣. 타입과 인터페이스의 차이점 알기
  // 단순한 함수 타입에는 타입 alias가 더 나은 선택
  // 함수 타입에 추가적인 속성이 있다면 타입이나 인터페이스 어떤 것을 선택하든 차이가 없다.
  // API에 대한 타입 선언을 작성해야 한다면 인터페이스를 사용하는 게 좋다.

  // 타입 alias와 인터페이스는 모두 제네릭이 가능하다.

  type TState = {
    name: string;
    capital: string;
  };

  interface IState {
    name: string;
    capital: string;
  }

  // 유니온 타입 O, 유니온 인터페이스 X
  // 인터페이스는 선언 병합이 가능하다. (declaration merging)

  interface IState {
    name: string;
    capital: string;
  }

  interface IState {
    population: number;
  }

  const wyoming: IState = {
    name: 'Wyoming',
    capital: 'Cheyenne',
    population: 500_000,
  };

  // Item 1️⃣4️⃣. 타입 연산과 제너릭 사용으로 반복 줄이기
  interface Person {
    firstName: string;
    lastName: string;
  }

  interface PersonWithBirthDate {
    firstName: string;
    lastName: string;
    birth: Date;
  }
  // 위의 경우 수정하여 반복 제거
  interface PersonWithBirthDate extends Person {
    birth: Date;
  }

  // 반복을 줄이는 가장 간단한 방법: 타입에 이름을 붙이는 것.

  // 함수가 같은 타입 시그니처를 공유하는 경우 -> 공유하는 시그니처를 명명된 타입으로 분리 가능
  function get(url: string, opts: Options): Promise<Response> {}
  function post(url: string, opts: Options): Promise<Response> {}

  type HTTPFunction = (url: string, opts: Options) => Promise<Response>;
  const get: HTTPFunction = (url, opts) => {};
  const post: HTTPFunction = (url, opts) => {};

  // 전체 애플리케이션 상태 표현
  interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
  }

  // 부분만 표현
  interface TopNavState {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
  }

  // State를 인덱싱하여 속성의 타입에서 중복을 제거할 수 있다.

  type TopNavState1 = {
    userId: State['userId'];
    pageTitle: State['pageTitle'];
    recentFiles: State['recentFiles'];
  };

  // 매핑된 타입을 사용하면 중복 수준이 좀 더 나아진다.
  // 매핑된 타입은 배열의 필드를 루프 도는 것과 같은 방식이다.
  type TopNavState2 = {
    [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k];
  };

  // Item 1️⃣5️⃣. 동적 데이터에 인덱스 시그니처 사용하기
  // 타입스크립트에서는 타입에 '인덱스 시그니처'를 명시하여 유연하게 매핑을 표현할 수 있다.

  // [property: string]: string -> 인덱스 시그니처
  type Rocket = { [property: string]: string };

  // key 마다 다른 타입을 가질 수 없다.
  // key는 무엇이든 가능하기 때문에 자동 완성 기능이 동작하지 않는다.
  // => 인덱스 시그니처는 부정확하다.
  const rocket: Rocket = {
    name: 'Falcon 9',
    variant: 'v1.0',
    thrust: '4,940 kN', // 이 key는 값 타입이 number여야 할 수도 있다.
  };

  // 위와 같은 경우에는 interface를 사용해야 한다.

  // Item 1️⃣6️⃣. number 인덱스 시그니처보다는 Array, 튜플, ArrayLike를 사용하기
  // 인덱스 시그니처가 'number'로 표현되어있다면 입력한 값이 number여야 한다는 것을 의미하지만,
  // 실제 런타임에 사용되는 키는 string 타입이다.
  // 인댁스 시그니처로 사용된 number 타입은 버그를 잡기 위한 순수 타입스크립트 코드이다.

  // Item 1️⃣7️⃣. 변경 관련된 오류 방지를 위해 readonly 사용하기

  // Item 1️⃣8️⃣. 매핑된 타입을 사용하여 값을 동기화하기
  // 매핑된 타입을 사용해서 관련된 값과 타입을 동기화하도록 한다.

  interface ScatterProps {
    // The data
    xs: number[];
    ys: number[];

    // Display
    xRange: [number, number];
    yRange: [number, number];
    color: string;

    // Events
    onClick: (x: number, y: number, index: number) => void;
  }

  function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    let k: keyof ScatterProps;

    for (k in oldProps) {
      if (oldProps[k] !== newProps[k]) {
        if (k !== 'onClick') return true;
      }
    }
    return false;
  }
}
