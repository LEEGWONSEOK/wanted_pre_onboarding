const express = require('express');
const recruitCtrl = require('../controllers/recruits');
const router = express.Router({ mergeParams: true });

router.get('/recruits', recruitCtrl.readAllRecruit); // 채용공고 전체 조회
router.get('/recruits/search', recruitCtrl.searchRecruit); //채용공고 검색 조회
router.get('/recruits/:recruitId', recruitCtrl.readRecruit); //채용공고 상세 조회

router.post('/companys/:companyId/recruits', recruitCtrl.createRecruit); // 채용공고 등록
router.post('/recruits/:recruitId/apply', recruitCtrl.applyRecruit); // 채용공고 유저 지원

router.patch('/recruits/:recruitId', recruitCtrl.updateRecruit); // 채용공고 수정

router.delete('/recruits/:recruitId', recruitCtrl.deleteRecruit); // 채용공고 삭제

module.exports = router;