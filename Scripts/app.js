var ViewModel = function () {
    var self = this;
    self.products = ko.observableArray();
    self.error = ko.observable();
    self.success = ko.observable();
    self.panelTitle = ko.observable();
    self.panelButton = ko.observable();
        
    self.ProductForm = {
        ProductName: ko.observable(),
        QuantityPerUnit: ko.observable(),
        UnitPrice: ko.observable(),
        UnitsInStock: ko.observable(),
        UnitsOnOrder: ko.observable(),
        ReorderLevel: ko.observable(),
        Discontinued: ko.observable()
    }
    
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
    self.getProduct = function () {
        var id = parseInt($("#inputProductId").val());
        if (isNaN(id))
            getAllProducts();
        else
            ajaxHelper(productsUri + id, 'GET')
                .done(function (data) {
                    self.products(data);
                });
    }
    function getAllProducts() {
        ajaxHelper(productsUri, 'GET').done(function (data) {
            self.products(data);
        });
    }
    self.addProduct = function (formElement) {
        self.panelTitle("Добавить товар");
        self.panelButton("Добавить");
        var product = {
            ProductName: self.ProductForm.ProductName(),
            QuantityPerUnit: self.ProductForm.QuantityPerUnit(),
            UnitPrice: self.ProductForm.UnitPrice(),
            UnitsInStock: self.ProductForm.UnitsInStock(),
            UnitsOnOrder: self.ProductForm.UnitsOnOrder(),
            ReorderLevel: self.ProductForm.ReorderLevel(),
            Discontinued: self.ProductForm.Discontinued()
        };
        ajaxHelper(productsUri, 'POST', product).done(function (item) {
            self.products.push(item);
            self.success('Товар "'+product.ProductName+'" добавлен.');

        });
    }
    // редактирование записи
    self.productInfo = ko.observable();
    self.initEditProduct = function (item) {
        self.panelTitle("Редактировать товар");
        self.panelButton("Сохранить");
        ajaxHelper(productsUri+item.ProductID, 'GET').done(function (data) {
            self.productInfo(data);
        });
    }
    self.editProduct = function (item) {
        var id = self.productInfo.ProductID();
        var product = {
            ProductName: self.ProductForm.ProductName(),
            QuantityPerUnit: self.ProductForm.QuantityPerUnit(),
            UnitPrice: self.ProductForm.UnitPrice(),
            UnitsInStock: self.ProductForm.UnitsInStock(),
            UnitsOnOrder: self.ProductForm.UnitsOnOrder(),
            ReorderLevel: self.ProductForm.ReorderLevel(),
            Discontinued: self.ProductForm.Discontinued()
        };
        ajaxHelper(productsUri, 'PUT', {id, product }).done(function (item) {
            getAllProducts();
            self.success('Товар "' + product.ProductName + '" обновлён.');
        });
    }

    // удаление записи
    self.deleteProduct = function (item) {
        var deletedProductName = item.ProductName;
        ajaxHelper(productsUri + item.ProductID, 'DELETE').done(function (item) {
            getAllProducts();
            self.success('Товар "' + deletedProductName + '" удалён.');

        });
    }

    getAllProducts();
};

ko.applyBindings(new ViewModel());
