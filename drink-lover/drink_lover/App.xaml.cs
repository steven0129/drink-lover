using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace drink_lover
{
    public partial class App : Application
    {
        public NavigationPage nav;

        public App()
        {
            InitializeComponent();

            var instance = Singleton.getInstnace();
            instance.init();

            nav = new NavigationPage(instance.mainPage);
            var rootPage = instance.rootPage;
            var recommandDrinkPage = instance.recommandDrink;
            var menuPage = instance.menuPage;

            rootPage.Master = menuPage;
            rootPage.Detail = nav;

            MainPage = rootPage;
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
