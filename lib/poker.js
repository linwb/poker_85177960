(function(global){
    /**
     * card's type
     * @type {{SPADE: number, HEART: number, CLUB: number, DIAMOND: number, NULL: number}}
     */
    var CardType = {
        SPADE: 4,     //黑桃'♠'
        HEART: 3,     //红桃'♥'
        CLUB: 2,       //梅花'♣'
        DIAMOND: 1,    //方块'♦'
        NULL: 0         //未知
    }

    /**
     * card's value
     * @type {{A: number, K: number, Q: number, J: number, 10: number, 9: number, 8: number, 7: number, 6: number, 5: number, 4: number, 3: number, 2: number, NULL: number}}
     */
    var CardValue = {
        'A': 14,
        'K': 13,
        'Q': 12,
        'J': 11,
        '10': 10,
        '9': 9,
        '8': 8,
        '7': 7,
        '6': 6,
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2,
        'NULL': 0
    }

    /**
     * Card is indicate the single card
     * @param {CardValue} value card's value
     * @param {CardType} type card's type
     * @returns {Card}
     * @constructor
     */
    var Card = function(value,type){
        if (!(this instanceof Card)){
            throw TypeError("Card's instance must via new operate")
        }
        this.value = value || CardValue.NULL;
        this.type = type || CardType.NULL;
    }


    /**
     * clone a new card from old card,the new card's value and type equals to old one
     * @returns {Card} a new card
     */
    Card.prototype.clone = function() {
        return new Card(this.value,this.type);
    }
    /**
     * check up equals for two cards
     * @param {Card} other the other card
     * @returns {boolean} if equals return true,otherwise false
     */
    Card.prototype.equals = function(other){
        if (!other || !(other instanceof Card)){
            throw TypeError("the other card is not available")
        }
        return this.value === other.value && this.type === other.type;
    }
    /**
     * check up who is bigger than another one
     * @param other ther other card
     * @returns {number} return 1 bigger than, 2 smaller than,0 equals
     */
    Card.prototype.compareTo=function (other) {
        if (!other || !(other instanceof Card)){
            throw TypeError('the other card is not available');
        }
        if (this.value > other.value)
            return 1;
        if (this.value < other.value)
            return -1;
        return 0;
    }
    Card.prototype.toString = function() {
        return "Card(" + this.value + "," + this.type + ")";
    };
    /**
     * order
     * @type {{NULL: number, ASC: number, DESC: number}}
     */
    var  Order = {
        NULL : 0 ,//未排序
        ASC  : 1,//正序
        DESC : 2//倒序
    }
    /**
     * the type of multi cards
     * @type {{NULL: number, HIGH: number, PAIR: number, TWO_PAIR: number, THREE: number, STRAIGHT: number, FLUSH: number, FULL_HOUSE: number, FOUR: number, STRAIGHT_FLUSH: number, ROYAL_FLUSH: number}}
     */
    var PokerType = { //多张牌牌型
        NULL          : 0,//空
        HIGH          : 1,//高牌,散牌
        PAIR          : 2,//一对
        TWO_PAIR      : 3,//两对
        THREE         : 4,//三条
        STRAIGHT      : 5,//顺子
        FLUSH         : 6,//同花
        FULL_HOUSE     : 7,//葫芦
        FOUR          : 8,//四条,铁支
        STRAIGHT_FLUSH : 9,//普通同花顺
        ROYAL_FLUSH    : 10//皇家同花顺
    }
    if(typeof Object.create !== 'function'){
        Object.create = function(o){
            function F(){}
            F.prototype = o;
            return new F();
        }
    }
    var inherits = function(subType,superType){
        var prototype = Object.create(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }
    /**
     * the base of multi cards,
     * @param {Array} list the array of card
     * @constructor
     */
    var Cards = function(list){
        this.list = list || [];
        this.order = Order.NULL;
        this.pokerType = PokerType.NULL;
        this.checked = false;
    }
    Cards.prototype.size = function(){
        return this.list.length;
    }
    Cards.prototype.clone = function() {
        var other = Object.create(this);
        other.list = [];

        for(var i in this.list)
        {
            other.push(this.list[i]);
        }
        other.order = this.order;
        other.pokerType = this.pokerType;
        return other;
    }

    Cards.prototype.existsFour = function() {
        var cardNumber;
        for (var i = 0; i < this.list.length; i++) {
            var c = this.list[i];
            cardNumber = 0;
            for (var j = 0; j < this.list.length; j++) {
                var card = this.list[j];
                if (c.value === card.value)
                    cardNumber++;
                if (cardNumber >= 4)
                    return true;
            }
        }
        return false;
    }

    Cards.prototype.existsThree = function() {
        var cardNumber;
        for (var i = 0; i < this.list.length; i++) {
            var c = this.list[i];
            cardNumber = 0;
            for (var j = 0; j < this.list.length; j++) {
                var card = this.list[j];
                if (c.value === card.value)
                    cardNumber++;
                if (cardNumber >= 3)
                    return true;
            }
        }
        return false;
    }

    Cards.prototype.existsPair = function() {
        var cardNumber;
        for (var i = 0; i < this.list.length; i++) {
            var c = this.list[i];
            cardNumber = 0;
            for (var j = 0; j < this.list.length; j++) {
                var card = this.list[j];
                if (c.value === card.value)
                    cardNumber++;
                if (cardNumber >= 2)
                    return true;
            }
        }
        return false;
    }

    Cards.prototype.findFourNumber = function() {
        var cList = this;
        if(!this.order || this.order === Order.NULL){
            var cList = this.clone();
            cList.sort();
        }
        var count = 0;
        for (var i = 0; i <= cList.list.length - 4; i++) {
            var card1 = cList.list[i];
            var card2 = cList.list[i + 1];
            var card3 = cList.list[i + 2];
            var card4 = cList.list[i + 3];
            if (card1.value === card2.value && card2.value === card3.value && card3.value === card4.value)  {
                i += 3;
                count++;
            }
        }
        return count;
    }

    Cards.prototype.isSameFlower = function() {
        if (this.list.length <= 1)
            return false;
        var card0 = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].type!==card0.type)
                return false;
        }
        return true;
    }

    Cards.prototype.isSequence = function(){
        if (this.list.length <= 1)
            return false;
        var cList = this;
        if(!this.order || this.order === Order.NULL){
            var cList = this.clone();
            cList.sort();
        }
        for (var i = 1; i < cList.list.length; i++) {
            var j = cList.list[i].value - cList.list[0].value;
            if (Math.abs(j) != i)
                return false;
        }
        return true;
    }

    Cards.prototype.findThreeNumber = function() {
        var cList = this;
        if(!this.order || this.order === Order.NULL){
            var cList = this.clone();
            cList.sort();
        }
        var count = 0;
        for (var i = 0; i <= cList.list.length - 3; i++) {
            var card1 = cList.list[i];
            var card2 = cList.list[i + 1];
            var card3 = cList.list[i + 2];
            if (card1.value === card2.value && card2.value === card3.value) {
                i += 2;
                count++;
            }
        }
        return count;
    }

    Cards.prototype.findPairNumber = function() {
        var cList = this;
        if(!this.order || this.order === Order.NULL){
            var cList = this.clone();
            cList.sort();
        }
        var count = 0;
        for (var i = 0; i <= cList.list.length - 2; i++) {
            var card1 = cList.list[i];
            var card2 = cList.list[i + 1];
            if (card1.value == card2.value) {
                i++;
                count++;
            }
        }
        return count;
    }
    /**
     * check the cards have some significance,example for entity etc.
     * @returns {boolean} true the number of cards is 1..5
     */
    Cards.prototype.check = function() {
        this.checked = true;
        if (this.list.length <= 0 || this.list.length > 5){
            this.pokerType = PokerType.NULL;
            return false;
        }
        return true;
    }
    /**
     * 比较器，两多张牌进行比较
     * @param cardList 多张牌
     * @returns {number} 大于1，小于-1，等于0
     */
    Cards.prototype.compareTo = function(other){
        if(!other)
            throw TypeError('other is null or undefined');
        if (this.list.length <= 0 || this.list.length > 5){
            throw TypeError("two cards's length must be between 1 and 5");
        }
        if(!this.checked){
            throw TypeError("it must not be checked,"+this.toString());
        }
        if(this.pokerType == PokerType.NULL){
            throw TypeError("this cards must not be Entity,please invoke toEntity function,"+this.toString());
        }
        if(other.pokerType == PokerType.NULL){
            throw TypeError("the other cards must not be Entity,please invoke toEntity function"+other.toString());
        }
        if(this.pokerType > other.pokerType)
            return 1;
        else  if(this.pokerType < other.pokerType)
            return -1;
        else
            return 0;
    }
    Cards.prototype.toString = function() {
        var s = '{list:[';
        for(var i in this.list){
            if(i != 0){
                s +=  ","
            }
            s +=  this.list[i].toString();
        }
        s+="],order:" + this.order +",pokerType:" +this.pokerType+ "}";
        return s;
    }
    /**
     * 是否存在某张指定的牌
     * @param value 指定的牌或牌值
     * @returns {boolean}
     */
    Cards.prototype.exists = function (value) {

        if(value instanceof Card){
            return this.list.some(function(item){
                return item.equals(value)
            })
        } else {
            return this.list.some(function(item){
                return item.value === value;
            })
        }
    }

    Cards.prototype.push = function (card) {
        if(!card || !(card instanceof Card)){
            throw TypeError("card is not instance of Card")
        }
        this.list.push(card);
        this.checked = false;
        this.order = Order.NULL;
    }
    Cards.prototype.add = Cards.prototype.push;
    Cards.prototype.pop = function () {
        this.checked = false;
        return this.list.pop();
    }
    Cards.prototype.shift = function () {
        this.checked = false;
        return this.list.shift();
    }
    Cards.prototype.unshift = function (card) {
        if(!card || !(card instanceof Card)){
            throw TypeError("card is not instance of Card")
        }
        this.checked = false;
        this.list.unshift(card);
    }
    Cards.prototype.remove = function(card) {
        if(!card || !(card instanceof Card)){
            throw TypeError("card is not instance of Card")
        }
        var self = this;
        return this.list.some(function(item,index,array){
            if(card.equals(item)) {
                self.list.splice(index,1);
                self.order = Order.NULL;
                this.checked = false;
                return true;
            }
            return false;
        })
    }

    Cards.prototype.find = function(card) {
        if(!card || !(card instanceof Card)){
            throw TypeError("card is not instance of Card")
        }
        var list = this.list.filter(function(value) {
            return card.equals(value);
        })
        if(list.length >= 1){
            return list[0];
        } else {
            return null;
        }
    }
    /**
     * 排序
     * @param order 参数为正序，倒序,空
     */
    Cards.prototype.sort = function() {
        if (this.order == Order.ASC){
            return;
        }
        this.order = Order.ASC;
        this.list.sort(function(card1,card2){
            return card1.compareTo(card2);
        });
    }
    Cards.prototype.reverse = function() {
        if (this.order == Order.DESC){
            return;
        }
        this.order = Order.DESC;
        this.list.sort(function(card1,card2){
            return card2.compareTo(card1);
        });
    }
    Cards.prototype.toQuickEntity = function(EntityName) {
        if(!EntityName)
            throw TypeError('EntityName is null or undefined');
        var entity = new EntityName();
        entity.list = this.list;
        entity.order = this.order;
        if(entity.check()){
            return entity;
        }
        return null;
    }

    Cards.prototype.toEntity = function(EntityName){
        var cList = this.clone();
        if(!!EntityName)
            return cList.toQuickEntity(EntityName)
        //同花顺
        var entity =  cList.toQuickEntity(StraightFlushEntity)
        if(entity != null)
            return entity;
        //炸弹
        entity =  cList.toQuickEntity(FourEntity)
        if(entity != null)
            return entity;
        //葫芦
        entity =  cList.toQuickEntity(FullHouseEntity)
        if(entity != null)
            return entity;
        //同花
        entity =  cList.toQuickEntity(FlushEntity)
        if(entity != null)
            return entity;
        //顺子
        entity =  cList.toQuickEntity(StraightEntity)
        if(entity != null)
            return entity;
        //三条
        entity =  cList.toQuickEntity(ThreeEntity)
        if(entity != null)
            return entity;
        //两对
        entity =  cList.toQuickEntity(TwoPairEntity)
        if(entity != null)
            return entity;
        //一对
        entity =  cList.toQuickEntity(PairEntity)
        if(entity != null)
            return entity;
        //散牌,高牌
        entity =  cList.toQuickEntity(HighEntity)
        if(entity != null)
            return entity;
        return null;
    }

    Cards.prototype.toMaxFiveEntity = function() {
        if(this.list.length != 7)
            return null;
        var entityList = [];
        for(var i=0;i< 6;i++){
            for(var j=i+1;j<7;j++){
                var cList = this.clone();
                cList.remove(this.list[i]);
                cList.remove(this.list[j]);
                entityList.push(cList.toEntity());
            }
        }

        entityList.sort(function(entity1,entity2){
            return entity2.compareTo(entity1);
        });

        return entityList[0];
    }

    //***********************辅助实体开始*********************
    /**
     * 对子--多张牌中的数量为两张,牌值一样的牌组成的列表，注意：列表长度为2
     * @constructor
     */
    var Pair = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.PAIR;
    }
    inherits(Pair,Cards);
    Pair.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.list.length != 2 || !this.existsPair()){
            this.pokerType = PokerType.NULL;
            return false;
        }
        this.pokerType = PokerType.PAIR;
        return true;
    }
    Pair.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        return this.list[0].compareTo(other.list[0]);
    }
    /**
     * 三条--多张牌中的数量为三张,牌值一样的牌组成的列表，注意：列表长度为3
     * @author glacier
     * @constructor
     */
    var Three = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.THREE;
    }
    inherits(Three,Cards);
    Three.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.list.length != 3 || !this.existsThree()){
            this.pokerType = PokerType.NULL;
            return false;
        }
        this.pokerType = PokerType.THREE;
        return true;
    }
    Three.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        return this.list[0].compareTo(other.list[0]);
    }

    /**
     * 四条--多张牌中的数量为四张,牌值一样的牌组成的列表，注意：列表长度为4
     * @author glacier
     * @constructor
     */
    var Four = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.FOUR;
    }
    inherits(Four,Cards);
    Four.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.list.length != 4 || !this.existsFour()){
            this.pokerType = PokerType.NULL;
            return false;
        }
        this.pokerType = PokerType.FOUR;
        return true;
    }
    Four.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        return this.list[0].compareTo(other.list[0]);
    }

    //***********************辅助实体结束*********************
    //***********************辅助实体提取开始*********************
    /**
     * 对子提取器，提取对子列表，列表中的数据全为对子
     * @author glacier
     * @constructor
     */
    var PairTaker = function() {
    }
    /**
     * 从多张牌列表中提取对子，组成列表
     * @param cardLisBase
     * @returns {*}
     */
    PairTaker.take = function(cards) {
        if(!cards || cards.list.length < 2)
            return null;
        var cList = cards;
        if(!cards.order || cards.order === Order.NULL){
            var cList = cards.clone();
            cList.sort();
        }
        var pairList =[];
        var size = cList.list.length;
        for (var i = 0; i <= size - 2; i++) {
            var card1 = cList.list[i];
            var card2 = cList.list[i + 1];
            if (card1.value === card2.value)  {
                var pair = new Pair();
                pair.push(card1);
                pair.push(card2);
                pairList.push(pair);
                pair.checked = true;
                i++;
            }
        }
        if (pairList.length > 0)
            return pairList;
        return null;
    }

    var ThreeTaker = function() {
    }

    ThreeTaker.take = function(cards) {
        if(!cards || cards.list.length < 3)
            return null;
        var cList = cards;
        if(!cards.order || cards.order === Order.NULL){
            var cList = cards.clone();
            cList.sort();
        }
        var threeList =[];
        for (var i = 0; i <= cList.list.length - 3; i++) {
            var card1 = cList.list[i];
            var card2 = cList.list[i + 1];
            var card3 = cList.list[i + 2];
            if (card1.value === card2.value && card2.value === card3.value) {
                var three = new Three();
                three.push(card1);
                three.push(card2);
                three.push(card3);
                threeList.push(three);
                three.checked = true;
                i += 2;
            }
        }
        if (threeList.length > 0)
            return threeList;
        return null;
    }

    var FourTaker = function() {
    }

    FourTaker.take = function(cards) {
        if (!cards || cards.list.length < 4)
            return null;
        var cList = cards;
        if(!cards.order || cards.order === Order.NULL){
            var cList = cards.clone();
            cList.sort();
        }
        var fourList = [];
        for (var i = 0; i <= cList.list.length - 4; i++) {
            var card1 = cList.list[i];
            var card2 = cList.list[i + 1];
            var card3 = cList.list[i + 2];
            var card4 = cList.list[i + 3];
            if (card1.value === card2.value && card2.value === card3.value && card3.value === card4.value) {
                var four = new Four();
                four.push(card1);
                four.push(card2);
                four.push(card3);
                four.push(card4);
                fourList.push(four);
                four.checked = true;
                i += 3;
            }
        }
        if (fourList.length > 0)
            return fourList;
        return null;
    }
    //***********************辅助实体提取结束*********************
    //***********************EntityBegin*********************
    var StraightFlushEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.STRAIGHT_FLUSH;
    }

    inherits(StraightFlushEntity,Cards);

    StraightFlushEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.isSameFlower() && this.isSequence())  {
            if (this.exists(CardValue.A)){
                this.pokerType = PokerType.ROYAL_FLUSH;
                return true;
            }
            this.pokerType = PokerType.STRAIGHT_FLUSH;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    StraightFlushEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisHigh = this.toQuickEntity(HighEntity);
        var otherHigh = other.toQuickEntity(HighEntity);
        return thisHigh.compareTo(otherHigh);
    }
    var FourEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.FOUR;
    }

    inherits(FourEntity,Cards);
    FourEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.findFourNumber() == 1){
            this.pokerType = PokerType.FOUR;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    FourEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisFourList = FourTaker.take(this);
        var otherFourList = FourTaker.take(other);
        return thisFourList[0].list[0].compareTo(otherFourList[0].list[0]);
    }

    var FullHouseEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.FULL_HOUSE;
    }

    inherits(FullHouseEntity,Cards);
    FullHouseEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.findPairNumber() == 2 && this.existsThree() && !this.existsFour()){
            this.pokerType = PokerType.FULL_HOUSE;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    FullHouseEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisThreeList = ThreeTaker.take(this);
        var otherThreeList = ThreeTaker.take(other);
        return thisThreeList[0].list[0].compareTo(otherThreeList[0].list[0]);

    }
    var FlushEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.FLUSH;
    }
    inherits(FlushEntity,Cards);
    FlushEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.isSameFlower()){
            this.pokerType = PokerType.FLUSH;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    FlushEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisHigh = this.toQuickEntity(HighEntity);
        var otherHigh = other.toQuickEntity(HighEntity);
        return thisHigh.compareTo(otherHigh);
    }

    var StraightEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.STRAIGHT;
    }
    inherits(StraightEntity,Cards);
    StraightEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.isSequence()){
            this.pokerType = PokerType.STRAIGHT;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    StraightEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisHigh = this.toQuickEntity(HighEntity);
        var otherHigh = other.toQuickEntity(HighEntity);
        return thisHigh.compareTo(otherHigh);
    }

    var ThreeEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.THREE;
    }
    inherits(ThreeEntity,Cards);
    ThreeEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.findThreeNumber() == 1){
            this.pokerType = PokerType.THREE;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    ThreeEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisThreeList = ThreeTaker.take(this);
        var otherThreeList = ThreeTaker.take(other);

        if(thisThreeList[0].list[0].compareTo(otherThreeList[0].list[0]) !=0)
            return thisThreeList[0].list[0].compareTo(otherThreeList[0].list[0]);

        var thisHigh = this.toQuickEntity(HighEntity);
        var otherHigh = other.toQuickEntity(HighEntity);
        return thisHigh.compareTo(otherHigh);
    }

    var TwoPairEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.TWO_PAIR;
    }
    inherits(TwoPairEntity,Cards);
    TwoPairEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.findPairNumber() == 2){
            this.pokerType = PokerType.TWO_PAIR;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    TwoPairEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisPairList = PairTaker.take(this);
        var otherPairList = PairTaker.take(other);
        thisPairList.sort(function(pair1,pair2){
            return pair1.compareTo(pair2);
        });
        otherPairList.sort(function(pair1,pair2){
            return pair1.compareTo(pair2);
        });
        if (thisPairList[1].list[0].compareTo(otherPairList[1].list[0]) != 0)
            return thisPairList[1].list[0].compareTo(otherPairList[1].list[0]);

        if (thisPairList[0].list[0].compareTo(otherPairList[0].list[0]) != 0)
            return thisPairList[0].list[0].compareTo(otherPairList[0].list[0]);
        var thisHigh = this.toQuickEntity(HighEntity);
        var otherHigh = other.toQuickEntity(HighEntity);
        return thisHigh.compareTo(otherHigh);
    }
    var PairEntity = function(){
        Cards.apply(this,arguments);

        this.pokerType = PokerType.PAIR;
    }
    inherits(PairEntity,Cards);
    PairEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        if (this.findPairNumber() >= 1){
            this.pokerType = PokerType.PAIR;
            return true;
        }
        this.pokerType = PokerType.NULL;
        return false;
    }
    PairEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisPairList = PairTaker.take(this);
        var otherPairList = PairTaker.take(other);
        thisPairList.sort(function (pair1,pair2){
            return pair2.compareTo(pair1);
        });
        otherPairList.sort(function (pair1,pair2){
            return pair2.compareTo(pair1);
        });
        var thisPair = thisPairList[0];
        var otherPair = otherPairList[0];
        if (thisPair.list[0].compareTo(otherPair.list[0]) != 0)
            return thisPair.list[0].compareTo(otherPair.list[0]);
        var thisHigh = this.toQuickEntity(HighEntity);
        var otherHigh = other.toQuickEntity(HighEntity);
        return thisHigh.compareTo(otherHigh);
    }

    var HighEntity = function(){
        Cards.apply(this,arguments);
        this.pokerType = PokerType.HIGH;
    }
    inherits(HighEntity,Cards);
    HighEntity.prototype.check = function() {
        if(!Cards.prototype.check.call(this))
            return false;
        this.pokerType = PokerType.HIGH;
        return true;
    }
    HighEntity.prototype.compareTo = function(other) {
        var i = Cards.prototype.compareTo.call(this,other);
        if (i !== 0)
            return i;
        var thisList = this;
        var otherList = other;
        if(!this.order || this.order === Order.NULL){
            var thisList = this.clone();
            thisList.sort();
        }
        if(!other.order || other.order === Order.NULL){
            var otherList = other.clone();
            otherList.sort();
        }
        var size = thisList.list.length;
        if (otherList.list.length < thisList.list.length)
            size = otherList.list.length;
        if(size <= 0)
            throw TypeError('list is empty')
        for (var i = size - 1; i >= 0; i--) {
            if (thisList.list[i].compareTo(otherList.list[i]) != 0)
                return thisList.list[i].compareTo(otherList.list[i]);
        }
        return 0;
    }

    //***********************EntityEnd*********************
    var random =  function random(min,max){
        return Math.floor(min+Math.random()*(max-min));
    }

    var Deck = function(){
        if(!(this instanceof Deck)){
            throw TypeError("this must be instance of Deck");
        }
        Cards.apply(this,arguments);
        this.initial();
    }
    inherits(Deck,Cards);
    Deck.prototype.check = function(){
        if (this.list.length != 52)
            return false;
        return true;
    }
    Deck.prototype.initial = function() {
        for (var j = CardType.DIAMOND; j <= CardType.SPADE; j++)  {
            for (var i = CardValue[2]; i <= CardValue.A; i++) {
                var card = new Card(i, j);
                this.list.push(card);
            }
        }
    }
    Deck.prototype.dispatch = function() {
        if(this.list.length <= 0)
            return null;
        if(arguments.length === 1 && arguments[0] instanceof Card){

            return this.dispatchCard(arguments[0]);
        }
        if(arguments.length === 1 && typeof arguments[0] === 'number' && !isNaN(arguments[0])){
            if(arguments[0] == 1){
                return this.list.shift();
            }
            return this.dispatchList(arguments[0]);
        }
        return this.list.shift();
    }
    Deck.prototype.dispatchCard = function(card) {
        var c = this.find(card);
        this.remove(c);
        return c;
    }
    Deck.prototype.dispatchList = function(number) {
        if(this.list.length < number){
            throw TypeError("Deck has not enough card")
        }
        var list = [];
        for (var i = 0; i < number; i++) {
            var card = this.dispatch();
            list.push(card);
        }
        return list;
    }
    Deck.prototype.shuffle = function(times) {
        var a, b;
        while (times-- > 0) {
            do {
                a = random(0,this.list.length);
                b = random(0,this.list.length);
            } while (a == b);
            var card1 = this.list[a];
            var card2 = this.list[b];
            this.list[a] = card2;
            this.list[b] = card1;
        }
    }

     var poker = {
         CardType:CardType,
         CardValue:CardValue,
         Card:Card,
         EmptyCard:new Card(),
         Order:Order,
         PokerType:PokerType,
         Cards:Cards,
         Pair:Pair,
         Three:Three,
         Four:Four,
         PairTaker:PairTaker,
         ThreeTaker:ThreeTaker,
         FourTaker:FourTaker,
         HighEntity:HighEntity,
         PairEntity:PairEntity,
         TwoPairEntity:TwoPairEntity,
         ThreeEntity:ThreeEntity,
         StraightEntity:StraightEntity,
         FlushEntity:FlushEntity,
         FullHouseEntity:FullHouseEntity,
         StraightFlushEntity:StraightFlushEntity,
         FourEntity:FourEntity,
         Deck:Deck
    };

    if(typeof module !== 'undefined' && module.exports){
        module.exports = poker;
    } else if(typeof define === 'function' && define.amd){
        define([], function () {
            return poker;
        });
    } else {
        global.poker = poker;
    }
}(this));