using Ninject;
using System.Web.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class HomeController : Controller
    {
        IProductRepository productRepo;
        ISupplierRepository supplierRepo;
        public HomeController(IProductRepository r)
        {
            productRepo = r;
        }
        public HomeController(ISupplierRepository r)
        {
            supplierRepo = r;
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
