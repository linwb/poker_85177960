var poker = require('./lib/poker.js');
var assert = require('assert');
var Card = poker.Card;
var CardValue = poker.CardValue;
var CardType = poker.CardType;
var Cards = poker.Cards;
var Deck = poker.Deck;
var PokerType = poker.PokerType;

describe('poker.Card', function(){
    describe('#new Card()', function(){
        it("Card's instance must via new", function(){
            assert.throws(function () {
                Card();
            });
        })
        it('should return card with value {0,0} when new Card()', function(){
            assert.equal(0, new Card().value);
            assert.equal(0, new Card().type);
        })
    })
    describe('#clone', function(){
        it("the clone card must not point to the same address", function(){
            var one = new Card(CardValue.A,CardType.CLUB);
            var other = one.clone();
            assert.notEqual(one, other);
        })
        it('the clone card must has the same value and type', function(){
            var one = new Card(CardValue.A,CardType.CLUB);
            var other = one.clone();
            assert.equal(one.value, other.value);
            assert.equal(one.type, other.type);
        })
    })
    describe('#equals', function(){
        it("the clone card must be equals", function(){
            var one = new Card(CardValue.A,CardType.CLUB);
            var other = one.clone();
            assert.equal(true, one.equals(other));
        })
        it("two cards must be equals via type and value", function(){
            var one = new Card(CardValue.A,CardType.CLUB);
            var two = new Card(CardValue.A,CardType.CLUB);
            var three = new Card(CardValue.A,CardType.DIAMOND);
            var four = new Card(CardValue.K,CardType.CLUB);
            var five = new Card(CardValue.K,CardType.CLUB);
            var six = new Card(CardValue[2],CardType.CLUB);
            var seven = new Card(CardValue[2],CardType.CLUB);
            assert.equal(true, one.equals(two));
            assert.equal(false, one.equals(three));
            assert.equal(false, one.equals(four));
            assert.equal(true, five.equals(four));
            assert.equal(true, six.equals(seven));
        })
    })
    describe('#compareTo', function(){
        it("one must be bigger than another one", function(){
            var one = new Card(CardValue.A,CardType.CLUB);
            var other = new Card(CardValue.K,CardType.CLUB);
            var three = new Card(CardValue.K,CardType.DIAMOND);
            assert.equal(1, one.compareTo(other));
            assert.equal(-1, other.compareTo(one));
            assert.equal(0, other.compareTo(three));
        })

    })
})

describe('poker.Cards', function(){
    describe('#clone', function(){
        it("the clone cards must not point to the same address", function(){
            var c1 = new Card(CardValue.A,CardType.CLUB);
            var c2 = new Card(CardValue.K,CardType.DIAMOND);
            var c3 = new Card(CardValue.K,CardType.CLUB);
            var c4 = new Card(CardValue[2],CardType.CLUB);
            var cards1 = new Cards([c1,c2,c3,c4]);
            var cards2 = cards1.clone();
            assert.notEqual(cards1, cards2);
        })
        it('the clone cards must has all of the same card', function(){
            var c1 = new Card(CardValue.A,CardType.CLUB);
            var c2 = new Card(CardValue.K,CardType.DIAMOND);
            var c3 = new Card(CardValue.K,CardType.CLUB);
            var c4 = new Card(CardValue[2],CardType.CLUB);
            //var cards1 = new Cards([c1,c2,c3,c4]);
            var cards1 = new Cards();
            cards1.push(c1);
            cards1.push(c2);
            cards1.push(c3);
            cards1.push(c4);
            var cards2 = cards1.clone();
            var len = cards1.length;
            for (var i = 0;  i < len;  i++) {
                var card1 = cards1 [i];
                var card2 = cards2 [i];
                assert.equal(cards1.value, cards2.value);
                assert.equal(cards1.type, cards2.type);
            }
        })

    })
    describe('#existsFour',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(9,4),new Card(8,4)
            ]);
            assert.equal(true, cards1.existsFour());;

        })
    })
    describe('#existsThree',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(7,4),new Card(8,4)
            ]);
            assert.equal(true, cards1.existsThree());;

        })
    })
    describe('#existsPair',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(8,3),new Card(7,4),new Card(8,4)
            ]);
            assert.equal(true, cards1.existsPair());;

        })
    })
    describe('#findFourNumber',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(9,4),new Card(8,4)
            ]);
            assert.equal(1, cards1.findFourNumber());
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(7,4),new Card(8,4)
            ]);
            assert.equal(0, cards1.findFourNumber());
        })
    })
    describe('#isSameFlower',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(9,4),new Card(8,4)
            ]);
            assert.equal(false, cards1.isSameFlower());
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(9,4),new Card(7,4),new Card(8,4)
            ]);
            assert.equal(true, cards1.isSameFlower());
        })
    });
    describe('#isSequence',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(9,4),new Card(8,4)
            ]);
            assert.equal(false, cards1.isSequence());
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            assert.equal(true, cards1.isSequence());
        });
    });
    describe('#findThreeNumber',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(9,4),new Card(8,4)
            ]);
            assert.equal(1, cards1.findThreeNumber());
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            assert.equal(0, cards1.findThreeNumber());
        });
    });
    describe('#findPairNumber',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,1),new Card(9,2),new Card(9,3),new Card(9,4),new Card(8,4)
            ]);
            assert.equal(2, cards1.findPairNumber());
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            assert.equal(0, cards1.findPairNumber());
            var cards1 = new Cards([
                new Card(4,1),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            assert.equal(1, cards1.findPairNumber());
        });
    });
    describe('#check',function(){
        it('it must be return true',function(){
            var cards1 = new Cards();
            assert.equal(false, cards1.check());
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            assert.equal(true, cards1.check());
            var cards1 = new Cards([
                new Card(4,1),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4),new Card(9,4)
            ]);
            assert.equal(false, cards1.check());
        });
    });
    describe('#compareTo',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            cards1=cards1.toEntity();
            var cards2 = new Cards([
                new Card(3,4),new Card(4,2),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            cards2=cards2.toEntity();
            var cards3 = new Cards([
                new Card(4,1),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            cards3=cards3.toEntity();
            assert.equal(1, cards1.compareTo(cards2));
            assert.equal(1, cards1.compareTo(cards3));
            assert.equal(1, cards2.compareTo(cards3));
        });
    });
    describe('#exists',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);

            var cards2 = new Cards([
                new Card(3,4),new Card(4,2),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);

            var cards3 = new Cards([
                new Card(4,1),new Card(4,4),new Card(5,4),new Card(6,4),new Card(7,4)
            ]);
            var card = new Card(4,2)
            assert.equal(false, cards1.exists(card));
            assert.equal(true, cards2.exists(card));
            assert.equal(false, cards3.exists(card));

            assert.equal(false, cards1.exists(9));
            assert.equal(true, cards2.exists(5));
            assert.equal(false, cards3.exists(3));
        });
    });
    describe('#add',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4)
            ]);
            assert.throws(function () {
                cards1.push();
            });
            assert.throws(function () {
                cards1.push(2);
            });
            assert.doesNotThrow(function () {
                var card = new Card(2,2)
                cards1.push(card);
                assert.equal(5, cards1.size());
            });
        });
    });
    describe('#remove',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4)
            ]);
            assert.throws(function () {
                cards1.remove();
            });
            assert.throws(function () {
                cards1.remove(2);
            });
            var card = new Card(2,2);
            assert.equal(false, cards1.remove(card));
            var card = new Card(3,4);
            assert.equal(true, cards1.remove(card));
        });
    });
    describe('#find',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4)
            ]);
            assert.throws(function () {
                cards1.find();
            });
            assert.throws(function () {
                cards1.find(2);
            });
            var card = new Card(2,2);
            assert.equal(null, cards1.find(card));
            var card = new Card(3,4);
            assert.equal(true, cards1.find(card).equals(card));
        });
    });
    describe('#sort',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(9,4),new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4)
            ]);
            cards1.sort();
            assert.equal(3, cards1.shift().value);
            assert.equal(9, cards1.pop().value);
        });
    });
    describe('#toQuickEntity',function(){
        it('it must be return null or Entity',function(){
            var cards1 = new Cards([
                new Card(7,4),new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4)
            ]);
            var cards1 = cards1.toQuickEntity(poker.StraightEntity);
            var cards2 = cards1.toQuickEntity(poker.PairEntity);
            assert.equal(true,cards1 != null);
            assert.equal(true,cards2 == null);
        });
    });
    describe('#toEntity',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(7,4),new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4)
            ]);
            var cards1 = cards1.toEntity(poker.StraightEntity);
            var cards2 = cards1.toEntity(poker.PairEntity);
            assert.equal(true,cards1 != null);
            assert.equal(true,cards2 == null);
        });
        it('it must be return Entity',function(){
            var cards1 = new Cards([
                new Card(7,4),new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4)
            ]);
            var cards1 = cards1.toEntity();

            assert.equal(true,cards1.pokerType == PokerType.STRAIGHT_FLUSH);
        });
    });
    describe('#toMaxFiveEntity',function(){
        it('it must be return true',function(){
            var cards1 = new Cards([
                new Card(7,4),new Card(3,4),new Card(4,4),new Card(5,4),new Card(6,4),new Card(5,4),new Card(6,4)
            ]);
            var c = cards1.toMaxFiveEntity();
            assert.equal(true, c.pokerType == PokerType.STRAIGHT_FLUSH);
        });
        it('it must be return true from 6 cards',function(){
            var cards1 = new Cards([
                new Card(7,4),new Card(3,3),new Card(4,4),new Card(5,4),new Card(6,4),new Card(5,4)
            ]);
            var c = cards1.toMaxFiveEntity();
            console.log(c)
            assert.equal(true, c.pokerType == PokerType.FLUSH);
        });
    });
});

describe('poker.Pair', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var pair = new poker.Pair([
                new Card(2,3),new Card(2,4)
            ]);
            assert.equal(true, pair.check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var pair1 = new poker.Pair([new Card(2,3),new Card(2,4)]);
            var pair2 = new poker.Pair([new Card(2,3),new Card(2,4)]);
            assert.equal(0, pair1.toEntity().compareTo(pair2.toEntity()));
        });
    });
});
describe('poker.Three', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var three = new poker.Three([
                new Card(2,3),new Card(2,4),new Card(2,2)
            ]);
            assert.equal(true, three.check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var three1 = new poker.Three([new Card(2,3),new Card(2,4),new Card(2,2)]);
            var three2 = new poker.Three([new Card(2,3),new Card(2,4),new Card(2,2)]);
            assert.equal(0, three1.toEntity().compareTo(three2.toEntity()));
        });
    });
});
describe('poker.Four', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var four = new poker.Four([
                new Card(2,3),new Card(2,4),new Card(2,2),new Card(2,1)
            ]);
            assert.equal(true, four.check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var four1 = new poker.Four([new Card(2,3),new Card(2,4),new Card(2,2),new Card(2,1)]);
            var four2 = new poker.Four([new Card(2,3),new Card(2,4),new Card(2,2),new Card(2,1)]);
            assert.equal(0, four1.toEntity().compareTo(four2.toEntity()));
        });
    });
});
describe('poker.PairTaker', function() {
    describe('#take', function () {
        it("it must be return true", function () {
            var cards = new Cards([
                new Card(2,3),new Card(4,3),new Card(5,3),new Card(6,3),new Card(2,4)
            ]);

            var list = poker.PairTaker.take(cards);
            //
            assert.equal(true, list.length===1);
        });
    });

});
describe('poker.ThreeTaker', function() {
    describe('#take', function () {
        it("it must be return true", function () {
            var cards = new Cards([
                new Card(2,3),new Card(4,3),new Card(2,1),new Card(6,3),new Card(2,4)
            ]);

            var list = poker.ThreeTaker.take(cards);
            //
            assert.equal(true, list.length===1);
        });
    });

});
describe('poker.FourTaker', function() {
    describe('#take', function () {
        it("it must be return true", function () {
            var cards = new Cards([
                new Card(2,3),new Card(4,3),new Card(2,1),new Card(2,2),new Card(2,4)
            ]);

            var list = poker.FourTaker.take(cards);
            //
            assert.equal(true, list.length===1);
        });
    });
});
describe('poker.StraightFlushEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new poker.StraightFlushEntity([
                new Card(2,3),new Card(4,3),new Card(5,3),new Card(6,3),new Card(3,3)
            ]);
            assert.equal(true, entity.check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(2,3),new Card(4,3),new Card(5,3),new Card(6,3),new Card(3,3)
            ]);
            var entity2 = new Cards([
                new Card(5,4),new Card(7,4),new Card(9,4),new Card(6,4),new Card(8,4)
            ]);
            var entity3 = new Cards([
                new Card(6,4),new Card(6,3),new Card(6,1),new Card(6,2),new Card(8,4)
            ]);

            assert.equal(-1, entity1.toEntity().compareTo(entity2.toEntity()));
            assert.equal(1, entity1.toEntity().compareTo(entity3.toEntity()));
        });
    });
});
describe('poker.FourEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new poker.FourEntity([
                new Card(2,3),new Card(2,1),new Card(2,2),new Card(2,4),new Card(3,3)
            ]);
            assert.equal(true, entity.check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(2,3),new Card(2,1),new Card(2,2),new Card(2,4),new Card(3,3)
            ]);
            var entity2 = new Cards([
                new Card(5,3),new Card(5,1),new Card(5,2),new Card(5,4),new Card(3,3)
            ]);
            var entity3 = new Cards([
                new Card(8,3),new Card(8,1),new Card(8,2),new Card(8,4),new Card(3,3)
            ]);

            assert.equal(-1, entity1.toEntity().compareTo(entity2.toEntity()));
            assert.equal(-1, entity1.toEntity().compareTo(entity3.toEntity()));
        });
    });
});
describe('poker.FullHouseEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new poker.FullHouseEntity([
                new Card(2,3),new Card(2,1),new Card(2,2),new Card(3,4),new Card(3,3)
            ]);
            assert.equal(true, entity.check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(2,3),new Card(2,1),new Card(2,2),new Card(3,4),new Card(3,3)
            ]);
            var entity2 = new Cards([
                new Card(5,3),new Card(5,1),new Card(5,2),new Card(5,4),new Card(5,3)
            ]);
            var entity3 = new Cards([
                new Card(8,3),new Card(8,1),new Card(8,2),new Card(7,4),new Card(7,3)
            ]);

            assert.equal(-1, entity1.toEntity().compareTo(entity2.toEntity()));
            assert.equal(-1, entity1.toEntity().compareTo(entity3.toEntity()));
        });
    });
});
describe('poker.FlushEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new Cards([
                new Card(2,1),new Card(8,1),new Card(2,1),new Card(3,1),new Card(5,1)
            ]);
            assert.equal(true, entity.toEntity(poker.FlushEntity).check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(2,1),new Card(6,1),new Card(7,1),new Card(8,1),new Card(9,1)
            ]);
            var entity2 = new Cards([
                new Card(6,1),new Card(7,1),new Card(2,1),new Card(8,1),new Card(9,1)
            ]);
            var entity3 = new Cards([
                new Card(6,1),new Card(7,1),new Card(5,1),new Card(8,1),new Card(9,1)
            ]);

            assert.equal(0, entity1.toEntity().compareTo(entity2.toEntity()));
            assert.equal(-1, entity2.toEntity().compareTo(entity3.toEntity()));
        });
    });
});
describe('poker.StraightEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new Cards([
                new Card(2,1),new Card(3,3),new Card(4,1),new Card(5,1),new Card(6,1)
            ]);
            assert.equal(true, entity.toEntity(poker.StraightEntity).check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(10,1),new Card(6,2),new Card(7,1),new Card(8,1),new Card(9,1)
            ]);
            var entity2 = new Cards([
                new Card(6,1),new Card(7,1),new Card(5,3),new Card(8,1),new Card(9,1)
            ]);
            var entity3 = new Cards([
                new Card(6,1),new Card(7,1),new Card(5,4),new Card(8,1),new Card(4,1)
            ]);

            assert.equal(1, entity1.toEntity().compareTo(entity2.toEntity()));
            assert.equal(1, entity2.toEntity().compareTo(entity3.toEntity()));
        });
    });
});
describe('poker.ThreeEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new Cards([
                new Card(2,1),new Card(2,3),new Card(2,1),new Card(5,1),new Card(6,1)
            ]);
            assert.equal(true, entity.toEntity(poker.ThreeEntity).check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(10,1),new Card(10,2),new Card(10,3),new Card(8,1),new Card(9,1)
            ]);
            var entity2 = new Cards([
                new Card(6,1),new Card(6,2),new Card(6,3),new Card(8,1),new Card(9,1)
            ]);
            var entity3 = new Cards([
                new Card(7,1),new Card(7,2),new Card(7,4),new Card(8,1),new Card(4,1)
            ]);

            assert.equal(1, entity1.toEntity().compareTo(entity2.toEntity()));
            assert.equal(-1, entity2.toEntity().compareTo(entity3.toEntity()));
        });
    });
});
describe('poker.TwoPairEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new Cards([
                new Card(2,1),new Card(2,3),new Card(5,1),new Card(5,2),new Card(6,1)
            ]);
            assert.equal(true, entity.toEntity(poker.TwoPairEntity).check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(10,1),new Card(10,2),new Card(8,3),new Card(8,1),new Card(9,1)
            ]);
            var entity2 = new Cards([
                new Card(6,1),new Card(6,2),new Card(8,3),new Card(8,1),new Card(9,1)
            ]);
            var entity3 = new Cards([
                new Card(7,1),new Card(7,2),new Card(8,4),new Card(8,1),new Card(4,1)
            ]);
            var entity1 = entity1.toEntity();
            var entity2 = entity2.toEntity();
            var entity3 = entity3.toEntity();

            assert.equal(1, entity1.compareTo(entity2));
            assert.equal(-1, entity2.compareTo(entity3));
            assert.equal(1, entity1.compareTo(entity3));
        });
    });
});
describe('poker.PairEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new Cards([
                new Card(2,1),new Card(2,3),new Card(5,1),new Card(5,2),new Card(6,1)
            ]);
            assert.equal(true, entity.toEntity(poker.PairEntity).check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(10,1),new Card(10,2),new Card(5,3),new Card(8,1),new Card(9,1)
            ]);
            var entity2 = new Cards([
                new Card(6,1),new Card(6,2),new Card(5,3),new Card(8,1),new Card(9,1)
            ]);
            var entity3 = new Cards([
                new Card(7,1),new Card(7,2),new Card(5,4),new Card(8,1),new Card(4,1)
            ]);
            var entity1 = entity1.toEntity();
            var entity2 = entity2.toEntity();
            var entity3 = entity3.toEntity();

            assert.equal(1, entity1.compareTo(entity2));
            assert.equal(-1, entity2.compareTo(entity3));
            assert.equal(1, entity1.compareTo(entity3));
        });
    });
});
describe('poker.HighEntity', function() {
    describe('#check', function () {
        it("it must be return true", function () {
            var entity = new Cards([
                new Card(2,1),new Card(9,3),new Card(5,1),new Card(7,2),new Card(6,1)
            ]);
            assert.equal(true, entity.toEntity(poker.HighEntity).check());
        });
    });
    describe('#compareTo', function () {
        it("it must be return true", function () {
            var entity1 = new Cards([
                new Card(10,1),new Card(14,2),new Card(5,3),new Card(8,1),new Card(9,1)
            ]);
            var entity2 = new Cards([
                new Card(6,1),new Card(12,2),new Card(5,3),new Card(8,1),new Card(9,1)
            ]);
            var entity3 = new Cards([
                new Card(7,1),new Card(13,2),new Card(5,4),new Card(8,1),new Card(4,1)
            ]);
            var entity1 = entity1.toEntity();
            var entity2 = entity2.toEntity();
            var entity3 = entity3.toEntity();

            assert.equal(1, entity1.compareTo(entity2));
            assert.equal(-1, entity2.compareTo(entity3));
            assert.equal(1, entity1.compareTo(entity3));
        });
    });
});
describe('poker.Deck', function() {
    describe('#initial', function () {
        it("it must be return true", function () {
            var deck = new Deck();
            assert.equal(52, deck.size());
        });
    });
    describe('#dispatch', function () {
        it("it must be return true", function () {
            var deck = new Deck();
            var card = deck.dispatch(1);
            var c = new Card(2,1);

            assert.equal(true, card.equals(c));
        });
    });
    describe('#dispatchCard', function () {
        it("it must be return true", function () {
            var deck = new Deck();
            var card = new Card(2,1);
            var c =deck.dispatchCard(card);

            assert.equal(true, card.equals(c));
        });
    });
    describe('#dispatchList', function () {
        it("it must be return true", function () {
            var deck = new Deck();
            var list =deck.dispatchList(3);

            assert.equal(true, list.length == 3);
        });
    });

});