import {register, Utils} from 'platypus';

export default class Converters {
    protected static _inject: any = {
        utils: Utils
    };

    protected utils: Utils;
    protected imageBase = 'http://images.lowes.com/product/converted/';

    imageUrl(data: any): string {
        let utils = this.utils;

        if (!utils.isObject(data)) {
            return '';
        }

        let imageUrl: string = data.imageUrl,
            imageId: string = data.imageId;

        if (utils.isNull(imageUrl) && utils.isNull(imageId)) {
            return '';
        }

        if (!utils.isNull(imageUrl)) {
            return imageUrl;
        }

        imageId = String(imageId);

        return this.imageBase + imageId.slice(0, 6) + '/' + imageId + 'lg.jpg';
    }

    secondsToHours(seconds = [21600, 75600]): string {
        let first = seconds[0],
            second = seconds[1];

        first = first / 60 / 60;
        second = second / 60 / 60;

        return first + 'am - ' + second + 'pm';
    }

    title(title: string, both = false): string {
        let firstIndex = title.indexOf(' '),
            lastIndex = title.lastIndexOf(' ');

        if (!both) {
            return title.slice(firstIndex + 1);
        }

        return title.slice(firstIndex + 1, lastIndex);
    }
}

register.injectable('converters', Converters);
