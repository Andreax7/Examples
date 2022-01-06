import socket


def connect_to_server(host,port):
    s = socket.socket()
    s.connect((host, port))
    return s

def get_source(host, page, s):
    # forma za request - request na stranicu i response koji vrati HTML
    path_list=[]
    string=''
    brojac=0
    CRLF = '\r\n'
    request = 'GET /' + page + ' HTTP/1.1'
    request += CRLF
    request += 'Host: www.somepage.org '  + CRLF
    request += CRLF
    request= request.encode('utf-8')

    s.sendall(request)
    resp= s.recv(100000).decode()

    if resp.find('200 OK') > 0:
        brojac +=1
        string = page
    if string not in path_list:
        path_list.append(string)
    else:
        usable = False
    return resp

def get_links(source):
    global link_list 
    link_list = []
    beg = 0
    while True: 
        # Find nalazi prvo pojavljivanje stringa i vraca njegovu poziciju   
        beg_link = source.find('href="', beg)
        if beg_link == -1:
            return link_list
        end_link = source.find('"', beg_link + 6)  #parsiranje po htmlu
        link = (source [beg_link : end_link +1])

        # beg_link stavlja na novu poziciju trazene rijeci u source dok ne dode do kraja
        beg = end_link + 1
        
        if link not in link_list:
            link_list.append(link)
        
        if len(link_list) > 50:
            return link_list 

s = connect_to_server("www.somepage.org", 80)
source = get_source("www.somepage.org", '', s)  # Funckija koja uzima source(HTML) stranice //npr stallman...

#print (source) # Printa cijeli HTML stranice
print (get_links(source))






