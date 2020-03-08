var ViewModel = function () {
    var self = this;
    // Товары
    var productsUri = '/api/products/';
    self.products = ko.observableArray();
    self.error = ko.observable();
    self.success = ko.observable();
    self.productModalTitle = ko.observable();
    self.productModalButton = ko.observable();
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
            $("#productTableSpinner").hide();
        });
    }
    // получение товара по ID
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
    //получение всех товаров
    function GetAllProducts() {
        $("#productTableSpinner").show();
        AjaxHelper(productsUri, 'GET').done(function (data) {
            self.products(data);
            $("#productTableSpinner").hide();
        });
    }
    // добавление товара
    self.AddProductInit = function () {
        self.productModalTitle("Добавить товар");
        self.productModalButton("Добавить");
    }
    self.AddProduct = function (formElement) {
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
    // редактирование записи о товаре
    self.EditProductInit = function (item) {
        self.productModalTitle("Редактировать товар");
        self.productModalButton("Сохранить");
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
        var product = {
            ProductID: $('#productDetailModal #ProductID').val(),
            ProductName: $('#productDetailModal #ProductName').val(),
            QuantityPerUnit: $('#productDetailModal #QuantityPerUnit').val(),
            UnitPrice: $('#productDetailModal #UnitPrice').val(),
            UnitsInStock: $('#productDetailModal #UnitsInStock').val(),
            UnitsOnOrder: $('#productDetailModal #UnitsOnOrder').val(),
            ReorderLevel: $('#productDetailModal #ReorderLevel').val(),
            Discontinued: $('#productDetailModal #Discontinued').is(":checked")
        };
        var id = product.ProductID;
        AjaxHelper(productsUri + id, 'PUT', product).done(function (item) {
            self.success('Товар "' + product.ProductName + '" обновлён.');
        });
    }

    // удаление записи о товаре
    self.DeleteProduct = function (item) {
        var deletedProductName = item.ProductName;
        AjaxHelper(productsUri + item.ProductID, 'DELETE').done(function (item) {
            self.success('Товар "' + deletedProductName + '" удалён.');

        });
    }
    GetAllProducts();

    // Поставщики
    var suppliersUri = '/api/suppliers/';
    self.suppliers = ko.observableArray();
    self.supplierModalTitle = ko.observable();
    self.supplierModalButton = ko.observable();
    self.filterSupplierID = ko.observable();

    // получение записи о поставщике
    self.GetSupplier = function () {
        var id = self.filterSupplierID();
        if (isNaN(id))
            GetAllSuppliers();
        else
            AjaxHelper(suppliersUri + id, 'GET')
                .done(function (data) {
                    self.suppliers(data);
                });
    }
    // получение всех поставщиков
    function GetAllSuppliers() {
        $("#supplierTableSpinner").show();
        AjaxHelper(suppliersUri, 'GET').done(function (data) {
            self.suppliers(data);
            $("#supplierTableSpinner").hide();
        });
    }
    // добавление поставщика
    self.AddSupplierInit = function () {
        self.supplierModalTitle("Добавить поставщика");
        self.supplierModalButton("Добавить");
    }
    self.AddSupplier = function (formElement) {
        var supplier = new Object();
        supplier.SupplierID = $('#supplierDetailModal #SupplierID').val();
        supplier.CompanyName = $('#supplierDetailModal #CompanyName').val();
        supplier.ContactName = $('#supplierDetailModal #ContactName').val();
        supplier.ContactTitle = $('#supplierDetailModal #ContactTitle').val();
        supplier.City = $('#supplierDetailModal #City').val();
        supplier.Country = $('#supplierDetailModal #Country').val();
        supplier.HomePage = $('#supplierDetailModal #HomePage').val();
        AjaxHelper(suppliersUri, 'POST', supplier).done(function (item) {
            self.suppliers.push(item);
            self.success('Поставщик "' + supplier.CompanyName + '" добавлен.');

        });
    }
    // редактирование записи о поставщике: заполняем модальное окно
    self.EditSupplierInit = function (item) {
        self.supplierModalTitle("Редактировать Поставщик");
        self.supplierModalButton("Сохранить");
        AjaxHelper(suppliersUri + item.SupplierID, 'GET').done(function (data) {
            $('#supplierDetailModal #SupplierID').val(data.SupplierID);
            $('#supplierDetailModal #CompanyName').val(data.CompanyName);
            $('#supplierDetailModal #ContactName').val(data.ContactName);
            $('#supplierDetailModal #ContactTitle').val(data.ContactTitle);
            $('#supplierDetailModal #City').val(data.City);
            $('#supplierDetailModal #Country').val(data.Country);
            $('#supplierDetailModal #HomePage').val(data.HomePage);
        });
    }
    // отправка отредактированной записи о поставщике
    self.EditSupplier = function (item) {
        var supplier = {
            SupplierID: $('#supplierDetailModal #SupplierID').val(),
            CompanyName: $('#supplierDetailModal #CompanyName').val(),
            ContactName: $('#supplierDetailModal #ContactName').val(),
            ContactTitle: $('#supplierDetailModal #ContactTitle').val(),
            City: $('#supplierDetailModal #City').val(),
            Country: $('#supplierDetailModal #Country').val()
        };
        var id = supplier.SupplierID;
        AjaxHelper(suppliersUri + id, 'PUT', supplier).done(function (item) {
            self.success('Поставщик "' + supplier.CompanyName + '" обновлён.');
        });
    }

    // удаление выбранной записи о поставщике
    self.DeleteSupplier = function (item) {
        var deletedCompanyName = item.CompanyName;
        AjaxHelper(suppliersUri + item.SupplierID, 'DELETE').done(function (item) {
            self.success('Поставщик "' + deletedCompanyName + '" удалён.');
        });
    }

    GetAllSuppliers();
};

ko.applyBindings(new ViewModel());
