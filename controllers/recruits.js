const User = require('../models/user');
const Recruit = require('../models/recruit');
const Company = require('../models/company');
const sequelize = require("sequelize");
const { Op } = sequelize;

// 채용공고 등록
// URI: companys/{companyId}/recruits
module.exports.createRecruit = async (req, res) => {
  const { companyId } = req.params;
  const { position, reward, skill, desc } = req.body;
  await Recruit.create({
    position,
    reward,
    skill,
    desc,
    companyId
  }).then(result => {
    console.log('✅ createRecruit');
    res.json(result);
  }).catch(err => console.error(err));
}

// 채용공고 조회 전체
// URI: recruits?search=원티드
module.exports.readAllRecruit = async (req, res) => {
  await Recruit.findAll({
    raw: true,
    attributes: [ 'recruitId', 'position', 'reward', 'skill' ],
    include: {
      model: Company,
      attributes: { exclude: ['companyId'] },
    },
  }).then(result => {
    console.log('✅ readAllRecruit');
    console.log(result)
    res.send(result);
  }).catch(err => console.error(err));
}

// 채용공고 검색 조회
// URI: recruits?search=원티드
module.exports.searchRecruit = async (req, res) => {
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
    console.log('✅ readAllRecruit');
    console.log(result)
    res.send(result);
  }).catch(err => console.error(err));
}

// 채용공고 상세 조회
// URI: /recruits/{recruitId}
module.exports.readRecruit = async (req, res) => {
  const { recruitId } = req.params;
  await Recruit.findOne({
    raw: true,
    attributes: { exclude: ['companyId'] },
    where: { recruitId },
    include: {
      model: Company,
      attributes: { exclude: ['companyId'] },
    },
  }).then(result => {
    console.log('✅ readRecruit');
    console.log(result)
    res.send(result);
  }).catch(err => console.error(err));
}
