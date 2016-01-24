import {register, async} from 'platypus';
import BaseViewControl from '../base/base.vc';
import MyLowes from '../mylowes/mylowes.vc';
import CustomerSvc from '../../services/customer/customer.svc';
import ListSvc from '../../services/list/list.svc';
import {LIST_NAME} from '../../references/references';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    context = {
        MyLowes,
        user: <models.ICustomer>null,
        canLike: true,
        article: {
            title: 'South Central Gardening: Plants for the Shade',
            caption: 'Brighten a shady area with color and variegation in South Central gardens',
            body: 'Gardening in the shade is limited only by your imagination. Besides lots of variegated plants, colorful additions such as impatiens, coleus, caladium, and astilbes make your Oklahoma or Texas shady area dance with joy. Here are some plants suitable for South Central gardens in full to part shade. Be sure to check plant tags for specific light requirements.',
            sections: [{
                title: 'Trees and Shrubs',
                description: '',
                products: [{
                    id: 3625560,
                    name: '3.25-Gallon Varied-Color Camellia',
                    imageUrls: {
                        sm: "https://mobileimages.lowes.com/product/converted/020536/020536017679sm.jpg",
                        lg: "https://mobileimages.lowes.com/product/converted/020536/020536017679lg.jpg",
                        xl: "https://mobileimages.lowes.com/product/converted/020536/020536017679.jpg"
                    },
                    description: 'Camellia (Camellia japonica) is a great shrub for a shady area, thanks to the white variegation accenting dark-green foliage. Hardy in zones 8-10, camellia thrives in full to light shade with adequate moisture. Camellia grows at a moderate pace, and can reach 8 to 10 feet. Camellias should be planted in the shade in organic, somewhat acidic, semi-moist but well drained soil. If the soil is not well drained, it can cause the roots to rot.'
                }],
                related: 'Japanese maple, flowering dogwood, mahonia, Aucuba, Japanese yew, plum yew, Japanese aralia, hydrangea, azalea'
            }, {
                title: 'Perennials',
                description: '',
                products: [{
                    id: 4773061,
                    name: '2.5-Quart Spiderwort',
                    imageUrls: {
                        sm: "https://mobileimages.lowes.com/product/converted/022532/022532069614sm.jpg",
                        lg: "https://mobileimages.lowes.com/product/converted/022532/022532069614lg.jpg",
                        xl: "https://mobileimages.lowes.com/product/converted/022532/022532069614.jpg"
                    },
                    description: 'Spiderwort (Tradescantia) are weakly upright to scrambling plants, growing at a moderate pace to a maximum height of around 24 inches. Hardy in zones 4-8, spiderwort enjoy partial sun with adequate moisture. The flowers can be white, pink, or purple, but are most commonly bright blue, with three petals and six yellow anthers.'
                }, {
                    id: 4315817,
                    name: '2.5-Quart Asparagus Fern',
                    imageUrls: {
                        sm: "https://mobileimages.lowes.com/product/converted/020536/020536327020sm.jpg",
                        lg: "https://mobileimages.lowes.com/product/converted/020536/020536327020lg.jpg",
                        xl: "https://mobileimages.lowes.com/product/converted/020536/020536327020.jpg"
                    },
                    description: 'Asparagus Fern (Asparagus densiflorus) is an evergreen perennial plant, closely related to the vegetable asparagus. Asparagus fern cannot tolerate frost, which makes it a superb choice for gardening in the south central region. It does not require much water, making it a good plant to grow under glass. It is fast growing, reaching a maximum height of 24 inches.',
                    related: ''
                }],
                related: 'bleeding heart, yellow corydalis, ferns, hosta, coralbells, Lenten rose, pansy, oxalis, columbine, gardenia, woodland phlox, plumbago'
            }, {
                title: 'Annuals',
                description: '',
                products: [{
                    id: 999919988,
                    name: '1.25-Quart Caladium',
                    imageUrls: {
                        sm: "https://mobileimages.lowes.com/product/converted/014934/014934586097sm.jpg",
                        lg: "https://mobileimages.lowes.com/product/converted/014934/014934586097lg.jpg",
                        xl: "https://mobileimages.lowes.com/product/converted/014934/014934586097.jpg"
                    },
                    description: 'Caladiums (Caladium x hortulanum) grow from tubers and greatly complement other shade-loving plants such as ferns and impatiens. Mix several caladium varieties in a container for a colorful display of pink, red, rose, chartreuse, green, and white. Hardy in Zones 8–10, the tubers can be lifted and stored over winter in colder climates.'
                }],
                related: 'coleus, impatiens, wax begonia, wishbone flower, elephant’s ears, ginger'
            }]
        }
    };

    listId: number;
    listPromise: async.IThenable<void>;

    constructor(protected customers: CustomerSvc, protected lists: ListSvc) {
        super();
    }

    initialize() {
        let context = this.context,
            utils = this.utils;

        this.listPromise = this.customers.login().then((user) => {
            context.user = user;

            return this.lists.list(LIST_NAME).then((list) => {
                this.listId = list.id;
                return this.lists.items(list.id);
            }).then((items) => {
                let products = this.getProducts();

                utils.forEach((item) => {
                    let entryId = item.productInformation.catalogEntryId;
                    utils.some((product) => {
                        if (product.id === entryId) {
                            (<any>product).liked = true;
                            return true;
                        }
                    }, products);
                }, items.list);
            }).catch((error) => {
                context.canLike = false;
                // this.notification.fail('Error retrieving user list');
                this.utils.defer(this.initialize, 1000, null, this);
            });
        }).catch((error) => {
            context.canLike = false;
        });
    }

    toggleLike(product: any) {
        product.liked = !product.liked;

        this.listPromise.then(() => {
            if (product.liked) {
                return this.lists.addItem(this.listId, {
                    productId: product.id,
                    productName: product.name,
                    store: this.context.user.x_serviceStoreNumber
                });
            }

            return this.lists.items(this.listId).then((items) => {
                let entityId: number;
                this.utils.some((item) => {
                    if (item.productInformation.catalogEntryId === product.id) {
                        entityId = item.entityId;
                        return true;
                    }
                }, items.list);

                if (!entityId) {
                    return;
                }

                return this.lists.deleteItem(entityId);
            });
        }).catch((error) => {
            product.liked = false;
            this.notification.fail('Error adding product to list');
        });
    }

    getProducts() {
        let sections = this.context.article.sections;
        return sections[0].products.concat(sections[1].products).concat(sections[2].products);
    }
}

register.viewControl('home-vc', HomeViewControl, [
    CustomerSvc,
    ListSvc
]);
