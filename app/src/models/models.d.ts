declare namespace models {
    interface ICustomer {
        AuthToken: string;
        SSOToken: string;
        WCToken: string;
        WCTrustedToken: string;
        cartMerged: boolean;
        firstName: string;
        langId: number;
        lastName: string;
        logonId: string;
        store: number;
        userId: number;
        x_SSOToken: string;
        x_authenticationFailed: boolean;
        x_benefitCode: string;
        x_remainingAttempts: number;
        x_serviceStoreNumber: number;
        residence?: string;
        shade?: number;
    }

    interface IList {
        id: number;
        profileId: number;
        status: string;
        name: string;
        note: string;
        addTimestamp: string;
        updateTimestamp: string;
        addedFrom: string;
        addedBy: string;
        defaultList: boolean;
        entitySubType: string;
        entityType: string;
    }

    interface IListItems {
        pagingMetaData: IPagingMetaData;
        list: Array<IListItem>;
    }

    interface IListItem {
        binBinaryAsset: string;
        bookmark: string;
        productInformation: IProductInformation;
        entityType: string;
        entitySubType: string;
        note: string;
        color: string;
        reminder: string;
        parentFolder: IParentFolder;
        parentList: string;
        spaces: string;
        orderDate: string;
        addData: string;
        name: string;
        description: string;
        itemNumber: number;
        vendorNumber: number;
        modelNumber: number;
        imageId: number;
        assignedSpacesString: string;
        imageUrl: string;
        hasReminder: boolean;
        entityId: number;
        catEntityId: number;
        parentEntityId: number;
        houzzImageId: number;
        position: number;
        numberOfSpaces: number;
        id: number;
        new: boolean;
    }

    interface IProductInformation {
        catalogEntryId: number;
        savingsThroughDate: string;
        savingsValue: string;
        wasPrice: string;
        price: string;
        mapPrice: string;
        showMapPrice: boolean;
        availabilityMessage: IAvailabilityMessage;
        availabilityLocalStoreDisplayed: boolean;
        primaryPriceDescriptor: string;
    }

    interface IAvailabilityMessage {
        name: string;
    }

    interface IParentFolder {
        addDate: string;
        accessTimestamp: string;
        updateTimestamp: string;
        note: string;
        type: string;
        subType: string;
        parentFolder: string;
        parentList: string;
        parentIdList: string;
        parentNamesList: string;
        name: string;
        binEntityId: number;
        id: number;
    }

    interface IPagingMetaData {
        totalElements: number;
        pageSize: number;
        currentPage: number;
        elementRangeEnd: number;
        elementRangeStart: number;
        elementRangeEndIndex: number;
        elementRangeStartIndex: number;
        enableNextPage: boolean;
        enablePrevPage: boolean;
        enableJumpPage: boolean;
        firstPage: number;
        lastPage: number;
        nextPage: number;
        prevPage: number;
        totalPages: number;
    }

    interface IProductList {
        productCount: number;
        breadcrumbs: Array<IBreadCrumb>;
        productList: Array<IProduct>;
    }

    interface IBreadCrumb {
        name: string;
        nValue: string;
    }

    interface IProduct {
        networkPrice: string;
        pricing: IPricing;
        description: string;
        brand: string;
        productId: number;
        itemNumber: number;
        modelId: string;
        vendorNumber: number;
        rating: string;
        reviewCount: number;
        imageUrls: IImageUrls;
        type: string;
        mulQuantity: number;
        minQuantity: number;
        links: Array<ILink>;
        specification: ISpecification;
        requiredItems: IProductList;

    }

    interface IPricing {
        availability: IAvailability;
        price: IPrice;
        productId: number;
        savings: ISavings;
        storeNumber: number;
    }

    interface IAvailability extends Array<{
        availabilityStatus: string;
        availabilityStatusCode: number;
        deliveryMethod: number;
        deliveryMethodName: string;
        fulfillmentNodeId: number;
        productStockType: string;
    }> {}

    interface IPrice {
        productId: number;
        retail: string;
        selling: string;
        typeCode: number;
        typeIndicator: string;
        was: string;
    }

    interface ISavings {
        endDate: number;
        total: string;
        totalPercentage: number;
    }

    interface IImageUrls {
        sm: string;
        lg: string;
        xl: string;
    }

    interface ILink {
        rel: string;
        href: string;
    }

    interface IStoreLocation {
        storeLocation: Array<ILocation>;
    }

    interface ILocation {
        address1: string;
        city: string;
        country: string;
        dailyHours: IHours;
        fax: string;
        flags: Array<string>;
        latitude: string;
        longitude: string;
        mapUrl: string;
        milesToStore: string;
        phone: string;
        state: string;
        storeName: string;
        storeNumber: number;
        zip: string;
    }

    interface IHours {
        [x: string]: Array<number>;
        friday: Array<number>;
        monday: Array<number>;
        saturday: Array<number>;
        sunday: Array<number>;
        thursday: Array<number>;
        tuesday: Array<number>;
        wednesday: Array<number>;
    }

    interface ISpecification {
        specs: Array<IKeyValue>;
    }

    interface IKeyValue {
        Key: string;
        Value: string;
    }
}
