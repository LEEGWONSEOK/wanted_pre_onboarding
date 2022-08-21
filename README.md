# WANTED 프리온보딩 - 백엔드 4차 선발과제

### 이권석


01) 채용공고 등록하기 ✅<br>
02) 채용공고 수정하기 ✅<br>
03) 채용공고 삭제하기 ✅<br>
04-1)  채용공고 전체 목록 조회하기 ✅<br>
04-2) 채용공고 검색 기능 구현하기 ✅<br>
05) 채용공고 상세페이지 조회하기(가산점문제 포함) ✅


## 요구사항
### 01. 채용공고 등록하기 

##### [ code ]

- URI: /companys/{companyId}/recruits

```javascript
module.exports.createRecruit = async (req, res, next) => {
  const { companyId } = req.params;
  const { position, reward, skill, desc } = req.body;
  await Recruit.create({
    position,
    reward,
    skill,
    desc,
    companyId
  }).then(result => {
    console.log('✅ 채용공고 등록');
    res.json(result);
  }).catch(err => next(err));
}
```


##### [ result ]
```JSON
{
    "recruitId": 4,
    "position": "백엔드",
    "reward": "500000",
    "skill": "Node.js",
    "desc": "expressJS를 잘하는 사람",
    "companyId": "1"
}
```


<br>

### 02. 채용공고 수정하기

##### [ code ]

- URI: /recruits/{recruitId}

```javascript
module.exports.updateRecruit = async (req, res, next) => {
  const { recruitId } = req.params;
  const { position, reward, skill, desc } = req.body;
  await Recruit.update({
    position,
    reward,
    skill,
    desc,
  }, {
    where: { recruitId }
  }).then(result => {
    console.log('✅ 채용공고 수정');
    res.json(result);
  }).catch(err => next(err));
}
```


##### [ result ]
```JSON
+-----------+--------------------+---------+---------+------------------------------------------------------+-----------+
| recruitId | position           | reward  | skill   | desc                                                 | companyId |
+-----------+--------------------+---------+---------+------------------------------------------------------+-----------+
|         4 | 백엔드             | 1000000 | Node.js | expressJS를 잘하는 사람                              |         1 |
+-----------+--------------------+---------+---------+------------------------------------------------------+-----------+
```

<br>


### 03. 채용공고 삭제하기

##### [ code ]

- URI: /recruits/{recruitId}

```javascript
module.exports.deleteRecruit = async (req, res, next) => {
  const { recruitId } = req.params;
  await Recruit.destroy({
    where: { recruitId }
  }).then(result => {
    console.log('✅ 채용공고 삭제');
    res.json(result);
  }).catch(err => next(err));
}
```

### 04-1. 채용공고 전체 목록 조회하기

##### [ code ]

- URI: /recruits

```javascript
module.exports.readAllRecruit = async (req, res, next) => {
  await Recruit.findAll({
    raw: true,
    attributes: [ 'recruitId', 'position', 'reward', 'skill' ],
    include: {
      model: Company,
      attributes: { exclude: ['companyId'] },
    },
  }).then(result => {
    console.log('✅ 모든 채용공고 조회');
    console.log(result)
    res.send(result);
  }).catch(err => next(err));
}
```

##### [ result ]
![README1](./readme/%EC%B1%84%EC%9A%A9%EA%B3%B5%EA%B3%A0%EC%A0%84%EC%B2%B4%EC%A1%B0%ED%9A%8C.png)

### 04-2. 채용공고 검색 기능 구현하기

##### [ code ]

- URI: /recruits/search?q=~~

```javascript
module.exports.searchRecruit = async (req, res, next) => {
  const { q } = req.query;
  await Recruit.findAll({
    raw: true,
    attributes: [ 'recruitId', 'position', 'reward', 'skill' ],
    where: {
      [Op.or]: [
        { position: { [Op.like]: `%${q}%` } },
        { skill: { [Op.like]: `%${q}%` } },
        { '$Company.companyName$': { [Op.like]: `%${q}%` } },
        { '$Company.city$': { [Op.like]: `%${q}%` } },
      ]
    },
    include: {
      model: Company,
      attributes: { exclude: ['companyId'] },
    },
  }).then(result => {
    console.log(`✅ '${q}'에 대한 검색 결과`);
    res.send(result);
  }).catch(err => next(err));
}
```

##### [ result ]
![README1](./readme/%EA%B2%80%EC%83%89%EA%B8%B0%EB%8A%A5%EA%B5%AC%ED%98%84.png)


### 05. 채용공고 상세페이지 가져오기

##### [ code ]

- URI: /recruits/{recruitId}

```javascript
module.exports.readRecruit = async (req, res, next) => {
  const { recruitId } = req.params;
  try {
    const recruit = await Recruit.findOne({
      raw: true,
      where: { recruitId },
      include: {
        model: Company,
        attributes: { exclude: ['companyId'] },
      },
    })
    const companyId = recruit.companyId;
    const company = await Recruit.findAll({
      raw: true,
      attributes: ['recruitId'],
      where: {
        companyId,
        recruitId: { [Op.notIn]: [recruitId] }
      }
    })
    const companyIdList = [];
    for (let id of company) {
      const a = Object.values(id);
      companyIdList.push(a[0]);
    }
    delete recruit.companyId;
    recruit.recruitings = companyIdList;
    console.log(`✅ ${recruit['Company.companyName']} 기업의 '${recruit.position}'채용공고 `)
    res.json(recruit);
  } catch (err) {
    next(err);
  }
}
```

##### [ result ]
![README1](./readme/%EC%B1%84%EC%9A%A9%EA%B3%B5%EA%B3%A0%EC%83%81%EC%84%B8%EC%A1%B0%ED%9A%8C.png)


### 06. 채용공고에 지원하기

##### [ code ]

- URI: /recruits/{recruitId}/apply

```javascript
module.exports.applyRecruit = async (req, res, next) => {
  const { recruitId } = req.params;
  const { userId } = req.body;
  const applyment = await Applyment.findOne({
    raw: true,
    where: { userId, recruitId }
  });
  console.log(applyment);
  if (!applyment) {
    await Applyment.create({
      recruitId,
      userId
    }).then(result => {
      console.log('✅ apply');
      res.json(result);
    }).catch(err => next(err));
  } else {
    res.send('이미 지원하셨습니다');
  }
}
```

##### [ result ]

```JSON
{
    "id": 1,
    "recruitId": "1",
    "userId": "1"
}
```