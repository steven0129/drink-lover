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
            nav = new NavigationPage(new drink_lover.MainPage());
            var rootPage = new RootPage();
            var recommandDrinkPage = new RecommandDrink();
            var menuPage = new MenuPage();

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
