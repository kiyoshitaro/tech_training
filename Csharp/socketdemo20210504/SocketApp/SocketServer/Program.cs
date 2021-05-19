using System;
using System.Net.Sockets;
using System.Threading;
using System.Net;
using System.Xml.Serialization;
using System.IO;
using System.Configuration;

namespace SocketServer
{
    internal interface IUserMessage {
        void Save(string path);
        void Show();
    }
    public class UserMessage: IUserMessage
    {
        public string SendTime { get; set; } 
        public string EmailAddress { get; set; }
        public string Username { get; set; }
        public int ThreadId { get; set; }
        public string Message { get; set; }
        public void Save(string path)
        {
            using (var stream = File.AppendText(path))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(UserMessage));
                serializer.Serialize(stream, this);
            }
        }
        public void Show() {
            Console.WriteLine($"{this.SendTime} ---- {this.Username}: {this.Message}");
        }

    }
    class Program
    {

        static IPAddress IpAddress = IPAddress.Any;
        static IPEndPoint LocalEndPoint = new IPEndPoint(IpAddress, int.Parse(ReadSetting("port")));
        static Socket tcpListener = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

        static string ReadSetting(string key)
        {
            string result = "Not Found";
            try
            {
                var appSettings = ConfigurationManager.AppSettings;
                result = appSettings[key] ?? "Not Found";
            }
            catch
            {
                Console.WriteLine("Error reading app settings");
            }
            return result;
        }


        static void Listeners()
        {


            Socket socketForClient = tcpListener.Accept();
            if (socketForClient.Connected)
            {
                try
                {
                    NetworkStream networkStream = new NetworkStream(socketForClient);
                    using (System.IO.StreamReader streamReader = new System.IO.StreamReader(networkStream))
                    using (System.IO.StreamWriter streamWriter = new System.IO.StreamWriter(networkStream))
                    {
                        string Username = streamReader.ReadLine();
                        string Email = streamReader.ReadLine();

                        //Receive signal
                        string connected = $"Client {Username} with {Email} in {socketForClient.RemoteEndPoint} is now connected to server!";
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine(connected);
                        Console.ResetColor();

                        //Accept connect 
                        streamWriter.WriteLine("Connected to server !");
                        streamWriter.Flush();

                        UserMessage item;
                        while (true)
                        {
                            string Message = streamReader.ReadLine();
                            string SendTime = DateTime.Now.ToString("MM/dd/yyyy hh:mm tt");

                            item = new UserMessage
                            {
                                SendTime = SendTime,
                                EmailAddress = Email,
                                Username = Username,
                                ThreadId = Thread.CurrentThread.ManagedThreadId,
                                Message = Message,
                            };
                            item.Save(ReadSetting("logfile"));
                            item.Show();
                            

                            if (Message == "exit")
                            {
                                Console.ForegroundColor = ConsoleColor.Red;
                                Console.WriteLine($"{SendTime} ---- {Username} is out");
                                Console.ResetColor();
                                break;
                            }

                        }
                    }

                    networkStream.Close();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }



            }
            socketForClient.Close();
        }

        public static void Main()
        {
            tcpListener.Bind(LocalEndPoint);

            tcpListener.Listen(10);
            Console.WriteLine("************This is Server************");
            Console.WriteLine("************Waiting************");
            //int numberClients = int.Parse(Console.ReadLine());
            //int numberClients = 1;
            //for (int i = 0; i < numberClients; i++)
            while (true)
            {
                try
                {

                    Thread newThread = new Thread(new ThreadStart(Listeners));
                    newThread.Start();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Exception when create new thread");
                    Console.WriteLine(ex.Message);
                }

            }

        }
    }
}
