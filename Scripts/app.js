var ViewModel = function () {
    var self = this;
    self.products = ko.observableArray();
    self.error = ko.observable();

    var productsUri = '/api/products/';

    function ajaxHelper(uri, method, data) {
        self.error('');
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllProducts() {
        ajaxHelper(productsUri, 'GET').done(function (data) {
            self.products(data);
        });
    }

    self.getProduct = new function () {
        var id = $('#inputProductId').val();
        ajaxHelper(productsUri + '/' + id, 'GET')
            .done(function (data) {
                self.products(data);
            });
    }

    self.NewProduct = {
        ProductName: ko.observable(),
        QuantityPerUnit: ko.observable(),
        UnitPrice: ko.observable(),
        UnitsInStock: ko.observable(),
        UnitsOnOrder: ko.observable(),
        ReorderLevel: ko.observable(),
        Discontinued: ko.observable()
    };

    self.addProduct = new function (formElement) {
        var product = {
            ProductName: self.NewProduct.ProductName(),
            QuantityPerUnit: self.NewProduct.QuantityPerUnit(),
            UnitPrice: self.NewProduct.UnitPrice(),
            UnitsInStock: self.NewProduct.UnitsInStock(),
            UnitsOnOrder: self.NewProduct.UnitsOnOrder(),
            ReorderLevel: self.NewProduct.ReorderLevel(),
            Discontinued: self.NewProduct.Discontinued()
        };
        ajaxHelper(productsUri, 'POST', product).done(function (item) {
            self.products.push(item);
        });
    }

    getAllProducts();
};

ko.applyBindings(new ViewModel());