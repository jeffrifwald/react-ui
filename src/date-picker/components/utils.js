var utils = {
    formatMap: {
        /**
         * @method d
         * Gets the padded day of the month.
         * @returns {String}
         */
        d: function(date) {
            return this.padZero(date.getDate());
        },

        /**
         * @method j
         * Gets the day of the month.
         * @returns {Number}
         */
        j: function(date) {
            return date.getDate();
        },

        /**
         * @method m
         * Gets the padded month.
         * @returns {String}
         */
        m: function(date) {
            return this.padZero(date.getMonth() + 1);
        },

        /**
         * @method m
         * Gets the month.
         * @returns {Number}
         */
        n: function(date) {
            return date.getMonth() + 1;
        },

        /**
         * @method w
         * Gets the day of the week.
         * @returns {Number}
         */
        w: function(date) {
            return date.getDay();
        },

        /**
         * @method Y
         * Gets the full year.
         * @returns {Number}
         */
        Y: function(date) {
            return date.getFullYear();
        },

        /**
         * @method y
         * Gets the last 2 digits of the year.
         * @returns {Number}
         */
        y: function(date) {
            return date.getFullYear().toString().slice(2);
        },

        /**
         * @method U
         * Gets the Unix timestamp.
         * @returns {Number}
         */
        U: function(date) {
            return parseInt(date.getTime() / 1000, 10);
        }
    },

    addDays: function(date, days) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    },

    cleanDate: function(date) {
        var clean = new Date(date);

        clean.setHours(0);
        clean.setMinutes(0);
        clean.setSeconds(0);
        clean.setMilliseconds(0);

        return clean;
    },

    escapeFormat: function(date, a, b) {
        if (a.indexOf('\\') !== -1) {
            return a.slice(1);
        }

        return b + this.formatMap[a.slice(a.length - 1)].call(this, date);
    },

    format: function(date, format) {
        return format.replace(/([^\u2166]?)[djmnwyYU]/g, this.escapeFormat.bind(this, date));
    },

    padZero: function(value) {
        return value > 9 ? value : '0' + value;
    },

    getDays: function(date) {
        var firstDay = this.getFirstDay(date);
        var lastDay = this.addDays(firstDay, 41);
        var currentDay = firstDay;
        var days = [];

        while (currentDay.getTime() <= lastDay.getTime()) {
            days.push(currentDay);
            currentDay = this.addDays(currentDay, 1);
        }

        return days;
    },

    getFirstDay: function(date) {
        var firstDate = new Date(date);

        firstDate.setDate(1);
        firstDate = this.addDays(firstDate, firstDate.getDay() * -1);

        return firstDate;
    },

    sameDate: function(a, b) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    },

    isDisabledDate: function(date, disabledDates) {
        return disabledDates.filter(function(disabledDate) {
            return this.sameDate(disabledDate, date);
        }, this).length ? true : false;
    },

    /**
     * @method emptyFn
     * Default handler for all events.
     */
    emptyFn: function() {}
};

module.exports = utils;
