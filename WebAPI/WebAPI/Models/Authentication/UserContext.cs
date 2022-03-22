using WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace WebAPI.Models
{
    public class UserContext
    {
        public string GetUsers(string UserData)
        {
            //var UserData = ((ClaimsIdentity)User.Identity).Claims.FirstOrDefault(c => c.Type.Equals(ClaimTypes.UserData)).Value;
            var jobject = (JObject)JsonConvert.DeserializeObject(UserData);
            var userid = ((Newtonsoft.Json.Linq.JProperty)jobject.First).Value;
            return userid.ToString();
        }
    }
}
