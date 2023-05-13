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

  // Item 8️⃣. 타입 공간과 값 공간의 심벌 구분하기
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
  // Item 9️⃣. 타입 단언보다는 타입 선언을 사용하기
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

  //ㅔ people3 코드를 좀 더 간결하게 표현
  const people4 = ['alice', 'bob', 'jan'].map((name): Person => ({ name }));

  const people5: Person[] = ['alice', 'bob', 'jan'].map((name): Person => ({ name }));
}
