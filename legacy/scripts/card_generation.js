const fs = require("fs");
const cards_info = JSON.parse(fs.readFileSync("./json/cards_info.json"));
const drive_info = JSON.parse(fs.readFileSync("./json/drive_info.json"));
card_to_file_id = (card_name) => {
    const card_drive = drive_info.cards
    for (let i = 0; i < card_drive.length; i++) {
        if (card_drive[i].name === card_name.split(".")[0]) {
            return card_drive[i].drive_id
        }
    }
}

all_cards = () => {
    let cards = cards_info.map(a => {return {...a}})
    for (let i = 0; i < cards.length; i++) {
        delete cards[i].filename
        delete cards[i].id
        delete cards[i].stats
    }
    return cards
}

card_info = (card_id) => {
    return cards_info[parseInt(card_id)]
}

class generate {
    constructor(probability) {
        //load json
        this.card_probability = probability
        //decimal place
        this.dp = 0;
        for (const [key, value] of Object.entries(this.card_probability)) {
            if (String(value).indexOf(".") != -1) {
                var _dp = String(value).split(".")[1].length;
                if (_dp > this.dp) {
                    this.dp = _dp;
                };
            };
        };
        this.rnd_max_value = 100 * (Math.pow(10, this.dp));
        //card probability
        var pre_value = 0;
        for (const [key, value] of Object.entries(this.card_probability)) {
            this.card_probability[key] = value * (Math.pow(10, this.dp)) + pre_value;
            pre_value += value * (Math.pow(10, this.dp));
        };
        //card info
        var _cards = {"S":[], "A":[], "B":[], "C":[], "D":[]}
        cards_info.forEach((value) => {
            _cards[value.tier].push(value)
        });
        this.cards_info_by_tier = _cards;

        //functions
        this.randint = (max) => {
            return Math.floor(Math.random() * max);
        };
        this.randint_b = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
          };
        this.card_to_file_id = (card_name) => {
            const card_drive = drive_info.cards
            for (let i = 0; i < card_drive.length; i++) {
                if (card_drive[i].name === card_name.split(".")[0]) {
                    return card_drive[i].drive_id
                }
            }
        }
    };

    tier(){
        console.log(this.rnd_max_value)
        var _randint = this.randint(this.rnd_max_value);
        for (const [key, value] of Object.entries(this.card_probability)) {
            if (_randint <= value) {
                return key;
            };
        };
    };

    card(tier){
        var _randint = this.randint(this.cards_info_by_tier[tier].length);
        return this.cards_info_by_tier[tier][_randint];
    }

    stats(card){
        //var _stats = {"str":card.str, "def":card.def, "agi":card.agi}
        var _stats = {"str":0, "def":0, "agi":0}
        /*for (const [key, value] of Object.entries(_stats)) {
            var _randint = this.randint_b(value[0], value[1]);
            _stats[key] = _randint
        }*/
        //_stats.hp = card.hp
        _stats.hp = 0
        return _stats
    }

    all() {
        const _tier = this.tier()
        const _card = this.card(_tier)
        const _stats = this.stats(_card)
        const [filename, format] = _card.filename.split(".")
        const _file_id = this.card_to_file_id(filename)
        return {card_name:_card.name, card_id: _card.id, file_id:_file_id, format:format, stats:_stats, tier:_tier}
    }
}

module.exports = {generate, card_to_file_id, all_cards, card_info}

if (require.main === module) {
    console.log(new generate({
        "S":1,
        "A":5,
        "B":17,
        "C":30,
        "D":49
    }).all())
}