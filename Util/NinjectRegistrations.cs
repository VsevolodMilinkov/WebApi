using Ninject.Modules;
using WebApi.Models;

namespace WebApi.Util
{
    public class NinjectRegistrations : NinjectModule
    {
        public override void Load()
        {
            Bind<IProductRepository>().To<ProductRepository>();
        }
    }
}