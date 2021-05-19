using System;
using System.Net.Sockets;
using System.Net;
using System.Configuration;

namespace SocketClient
{
    class Program
    {
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

        static public void Main()
        {

            TcpClient socketForServer;
            string IpAddress = ReadSetting("ip");
            string Port = ReadSetting("port");

            try
            {
                socketForServer = new TcpClient(IpAddress, int.Parse(Port));
            }
            catch
            {
                Console.WriteLine(
                $"Failed to connect to server at {IpAddress}:{Port}");
                return;
            }

            NetworkStream networkStream = socketForServer.GetStream();
            Console.WriteLine("*******This is client*****");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("---------------------------------------------------------");
            Console.WriteLine("-------- Type your username and email to login ----------");
            Console.WriteLine("-------- Type 'exit' to exit ----------------------------");
            Console.WriteLine("---------------------------------------------------------");
            Console.ResetColor();

            try
            {
                using (System.IO.StreamReader streamReader = new System.IO.StreamReader(networkStream))
                using (System.IO.StreamWriter streamWriter = new System.IO.StreamWriter(networkStream))
                {
                    string outputString;
                    // read the data from the host and display it
                    {
                        Console.WriteLine("Type username:");
                        string Username = Console.ReadLine();
                        streamWriter.WriteLine(Username);
                        streamWriter.Flush();

                        Console.WriteLine("Type email:");
                        string Email = Console.ReadLine();
                        streamWriter.WriteLine(Email);
                        streamWriter.Flush();

                        //Accept connect
                        outputString = streamReader.ReadLine();
                        Console.WriteLine(outputString);


                        Console.WriteLine("Type message:");
                        string Mess = Console.ReadLine();
                        while (Mess != "exit")
                        {
                            streamWriter.WriteLine(Mess);
                            streamWriter.Flush();
                            Console.WriteLine("Type message:");
                            Mess = Console.ReadLine();
                        }
                        streamWriter.WriteLine(Mess);
                        streamWriter.Flush();
                    }

                }    
            }
            catch
            {
                Console.WriteLine("Exception reading from Server");
            }
            networkStream.Close();
            System.Environment.Exit(0);
        }
    }
}