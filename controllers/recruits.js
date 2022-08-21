const User = require('../models/user');
const Recruit = require('../models/recruit');
const Company = require('../models/company');
const Applyment = require('../models/applyment');
const sequelize = require("sequelize");
const { Op } = sequelize;

// 채용공고 조회 전체
// URI: /recruits
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

// 채용공고 검색 조회
// URI: /recruits/search?q=~~
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

// 채용공고 상세 조회
// URI: /recruits/{recruitId}
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

// 채용공고 등록
// URI: /companys/{companyId}/recruits
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

// 채용공고 지원
// URI: recruits/{recruitId}/apply
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

// 채용공고 수정
// URI: recruits/{recruitId}
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

// 채용공고 삭제
// URI: recruits/{recruitId}
module.exports.deleteRecruit = async (req, res, next) => {
  const { recruitId } = req.params;
  await Recruit.destroy({
    where: { recruitId }
  }).then(result => {
    console.log('✅ 채용공고 삭제');
    res.json(result);
  }).catch(err => next(err));
}