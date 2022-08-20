const express = require('express');
const recruitCtrl = require('../controllers/recruits');
const router = express.Router({ mergeParams: true });

// 채용공고 등록
router.post('/companys/:companyId/recruits', recruitCtrl.createRecruit);

// 채용공고 전체 조회
router.get('/recruits', recruitCtrl.readAllRecruit);

// 채용공고 검색 조회
router.get('/recruits/search', recruitCtrl.searchRecruit);

// 채용공고 상세 조회
router.get('/recruits/:recruitId', recruitCtrl.readRecruit);

// 채용공고 수정
//router.patch('/:recruitId', recruitCtrl.updateRecruit);

// 채용공고 삭제
//router.delete('/:recruitId', recruitCtrl.deleteRecruit);

module.exports = router;