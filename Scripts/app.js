var ViewModel = function () {
    var self = this;
    var productsUri = '/api/products/';
    self.products = ko.observableArray();
    self.error = ko.observable();
    self.success = ko.observable();
    self.productInfo = {
        ProductID: $('#productDetailModal #ProductID').val(),
        ProductName: $('#productDetailModal #ProductName').val(),
        QuantityPerUnit: $('#productDetailModal #QuantityPerUnit').val(),
        UnitPrice: $('#productDetailModal #UnitPrice').val(),
        UnitsInStock: $('#productDetailModal #UnitsInStock').val(),
        UnitsOnOrder: $('#productDetailModal #UnitsOnOrder').val(),
        ReorderLevel: $('#productDetailModal #ReorderLevel').val(),
        Discontinued: $('#productDetailModal #Discontinued').is(":checked")
    };
    self.modalTitle = ko.observable();
    self.modalButton = ko.observable();
    self.filterProductID = ko.observable();

    function AjaxHelper(uri, method, data) {
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
    self.GetProduct = function () {
        var id = self.filterProductID();
        if (isNaN(id))
            GetAllProducts();
        else
            AjaxHelper(productsUri + id, 'GET')
                .done(function (data) {
                    self.products(data);
                });
    }
    function GetAllProducts() {
        $("#productTableSpinner").show();
        AjaxHelper(productsUri, 'GET').done(function (data) {
            self.products(data);
            $("#productTableSpinner").hide();
        });
    }
    // добавление продукта
    self.AddProductInit = function () {
        self.modalTitle("Добавить товар");
        self.modalButton("Добавить");
        $('#productDetailModal #ProductID').val('');
        $('#productDetailModal #ProductName').val('');
        $('#productDetailModal #QuantityPerUnit').val('');
        $('#productDetailModal #UnitPrice').val('');
        $('#productDetailModal #UnitsInStock').val('');
        $('#productDetailModal #UnitsOnOrder').val('');
        $('#productDetailModal #ReorderLevel').val('');
        $('#productDetailModal #Discontinued').prop('checked', false);
    }
    self.AddProduct = function (formElement) {
        //var product = self.productInfo;
        var product = new Object();
        product.ProductID = $('#productDetailModal #ProductID').val();
        product.ProductName = $('#productDetailModal #ProductName').val();
        product.QuantityPerUnit = $('#productDetailModal #QuantityPerUnit').val();
        product.UnitPrice = $('#productDetailModal #UnitPrice').val();
        product.UnitsInStock = $('#productDetailModal #UnitsInStock').val();
        product.UnitsOnOrder = $('#productDetailModal #UnitsOnOrder').val();
        product.ReorderLevel = $('#productDetailModal #ReorderLevel').val();
        product.Discontinued = $('#productDetailModal #Discontinued').is(":checked");
        AjaxHelper(productsUri, 'POST', product).done(function (item) {
            self.products.push(item);
            self.success('Товар "' + product.ProductName + '" добавлен.');

        });
    }
    // редактирование записи

    self.EditProductInit = function (item) {
        self.modalTitle("Редактировать товар");
        self.modalButton("Сохранить");
        AjaxHelper(productsUri + item.ProductID, 'GET').done(function (data) {
            $('#productDetailModal #ProductID').val(data.ProductID);
            $('#productDetailModal #ProductName').val(data.ProductName);
            $('#productDetailModal #QuantityPerUnit').val(data.QuantityPerUnit);
            $('#productDetailModal #UnitPrice').val(data.UnitPrice);
            $('#productDetailModal #UnitsInStock').val(data.UnitsInStock);
            $('#productDetailModal #UnitsOnOrder').val(data.UnitsOnOrder);
            $('#productDetailModal #ReorderLevel').val(data.ReorderLevel);
            $('#productDetailModal #Discontinued').prop("checked", data.Discontinued);
        });

    }
    self.EditProduct = function (item) {
        var product = self.productInfo;
        var id = product.ProductID;
        AjaxHelper(productsUri + id, 'PUT', product).done(function (item) {
            GetAllProducts();
            self.success('Товар "' + product.ProductName + '" обновлён.');
        });
    }

    // удаление записи
    self.DeleteProduct = function (item) {
        var deletedProductName = item.ProductName;
        AjaxHelper(productsUri + item.ProductID, 'DELETE').done(function (item) {
            GetAllProducts();
            self.success('Товар "' + deletedProductName + '" удалён.');

        });
    }

    GetAllProducts();
};

ko.applyBindings(new ViewModel());
