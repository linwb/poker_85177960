var poker = require('./lib/poker.js');
//create card
var card1 = new poker.Card(3,2);
var card2 = new poker.Card(poker.CardValue.A,poker.CardType.CLUB);
var card3 = new poker.Card(poker.CardValue[3],poker.CardType.DIAMOND);
//create cards,multi cards
var cards1 = new poker.Cards([
    card1,card2,card3
]);
var cards2 = new poker.Cards([
    new poker.Card(5,2),new poker.Card(6,2),new poker.Card(7,2),new poker.Card(8,2),new poker.Card(3,2)
]);
//compareTo,return 1,0,-1,cards must be toEntity() return max entity
var v = cards1.toEntity().compareTo(cards2.toEntity());//-1
//console.log(v)
//new Entity,must be invoke the function check()
//    HIGH          : 1,//高牌,散牌
//    PAIR          : 2,//一对
//    TWO_PAIR      : 3,//两对
//    THREE         : 4,//三条
//    STRAIGHT      : 5,//顺子
//    FLUSH         : 6,//同花
//    FULL_HOUSE     : 7,//葫芦
//    FOUR          : 8,//四条,铁支
//    STRAIGHT_FLUSH : 9,//普通同花顺
//    ROYAL_FLUSH    : 10//皇家同花顺
//toEntity():
//StraightFlushEntity
//FourEntity
//FullHouseEntity
//FlushEntity
//StraightEntity
//ThreeEntity
//TwoPairEntity
//PairEntity
//HighEntity
