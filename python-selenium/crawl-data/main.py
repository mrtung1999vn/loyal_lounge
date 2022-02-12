import time
import random
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
import psycopg2

hostname = '103.82.21.146'
username = 'postgres'
password = '123456789'
database = 'webthietbi'

user_login = 'mrtung1999vn'
pass_login = 'WwFfMj36Et7@KgB'

def ExcuteQueryAll(query):
    conn = psycopg2.connect(
        database=database, user=username, password=password, host=hostname, port='5433'
    )
    cursor = conn.cursor()
    cursor.execute(query)
    data = cursor.fetchall()
    return data
    # print("Connection established to: ",data[0]==0)
    # conn.close()


#ExcuteQuery
def ExcuteQuery(query):
    conn = psycopg2.connect(
        database=database, user=username, password=password, host=hostname, port='5433'
    )
    cursor = conn.cursor()
    cursor.execute(query)
    data = cursor.fetchone()
    if (data != None):
        return 1
    else:
        return 0
    # print("Connection established to: ",data[0]==0)
    # conn.close()

#InsertQuery

def insertQuery(query):
    conn = psycopg2.connect(
        database=database, user=username, password=password, host=hostname, port='5433'
    )
    print(query)
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()  # <- We MUST commit to reflect the inserted data
    cursor.close()
    conn.close()

# def checkLoai(str):
#     try:
#         if(str.index('my-account') >= 0):
#             return False
#         if(str.index('')  )
#     except:
#         return True

# GET LOAI SACH
def _get_loai_sach(driver):
    list_category = driver.find_elements_by_xpath("//a")

    for ele in list_category:
        try:
            link_href = ele.get_attribute('href')
            link_name = ele.accessible_name
            if (ExcuteQuery(f"""
                    select * from loai_sach
                    where ten_loai_sach = N'{link_name}'
                """) != 1):
                insertQuery(f"""
                        insert into loai_sach(ten_loai_sach, created_at, updated_at, link)
                        values( N'{link_name}',NOW(),NOW(),N'{link_href}' )
                    """)
                print("")
        except:
            pass
# GET SACH ITOOLS
def _get_sach_itools(driver):
    get_sach =  ExcuteQueryAll("""
        select * from loai_sach
    """)
    print(get_sach)

    for ele in get_sach:
        try:
            id_loai_sach = ele[0]
            link = ele[4]
            driver.get(link)
            # print(ele[4])
            time.sleep(10)
            if len(driver.find_elements_by_xpath("//div[@class=' hinh-trang-tin']")) > 0:
                _sach = driver.find_elements_by_xpath("//div[@class=' hinh-trang-tin']")
                index_sach = 0
                for ele_sach in driver.find_elements_by_xpath("//div[@class=' hinh-trang-tin']"):
                    try:
                        driver.find_elements_by_xpath("//div[@class=' hinh-trang-tin']")[0]
                        # driver.find_element_by_tag_name()
                        link_sach = ele_sach.find_element_by_tag_name("a").get_attribute("href")
                        link_image = ele_sach.find_element_by_tag_name("img").get_attribute("src")
                        ten_sach = driver.find_elements_by_xpath("//div[@class=' title-trang-tin']")[index_sach].find_element_by_tag_name("h3").text
                        id_loai_sach
                        index_sach = index_sach + 1
                        print("CLAWER")
                        if (ExcuteQuery(f"""
                            select * from sach_itools
                            where link = N'{link_sach}'
                            """) == 0):
                            insertQuery(f"""
                                insert into sach_itools(ten_sach,link,link_iframe,created_at,updated_at,id_loai_sach,link_image)
                                values(
                                    N'{ten_sach}', N'{link_sach}', N'', now(), Now(), {id_loai_sach}, N'{link_image}'
                                )
                                """)
                        # Qua Page
                        try:
                            if len(driver.find_element_by_xpath("//div[@class='quatrang']").text.split(' ')) > 0:
                                print("PAGE")
                                str_total_page = driver.find_element_by_xpath("//div[@class='quatrang']").text.split(' ')
                                total_page = str_total_page[len(str_total_page) - 2]

                                insertQuery(f"""
                                    update loai_sach set page = {total_page}
                                    where id_loai_sach = {id_loai_sach}
                                """)
                        except: pass
                        # Qua Page
                    except: pass
            else:
                print("NOT CLAWER")
        except: pass

from selenium.webdriver.common.keys import Keys
def _get_iframe_itools(driver):
    get_sach =  ExcuteQueryAll("""
        select * from sach_itools
    """)
    print(get_sach)
    for ele in get_sach:
        try:
            print(ele)
            driver.get(ele[2])
            driver.find_element_by_xpath("//iframe[@src]")
            driver.find_element_by_xpath("//iframe[@src]")
            link_iframe = driver.find_element_by_xpath("//iframe").get_attribute("src")
            insertQuery(f"""
                update sach_itools set link_iframe = N'{link_iframe}'
                where id_sach = {ele[0]}
            """)
        except: pass
    # print()
proxyList = [
    '171.243.20.166:33225',
]
from selenium.webdriver.common.alert import Alert

def __main__():
    chromeOptions = webdriver.ChromeOptions()

    chromeOptions.add_argument('--proxy-server={}'.format(random.choice(proxyList)))

    driver = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chromeOptions)

    instagram_link = "https://www.instagram.com/"

    driver.execute_script(f""" window.open("about:blank",'tab-instagram'); """)
    driver.switch_to.window(f"tab-instagram")
    driver.get(instagram_link)
    # for i in range(0, 10000000, 1):
    #     driver.execute_script(f""" window.open("about:blank",'tab{i}'); """)
    #     driver.switch_to.window(f"tab{i}")
    #     driver.get(ces_media)
    #     driver.execute_script("window.scrollTo(0,document.body.scrollHeight);")
    #     driver.find_element_by_xpath("//input[@name='ten']").send_keys(f"Happy New Year{i}")
    #     driver.find_element_by_xpath("//input[@name='dienthoai']").send_keys(f"0{i}")
    #     driver.find_element_by_xpath("//input[@name='email']").send_keys(f"SystemDevEngineer{i}HaiPhong@gmail.com")
    #     driver.find_element_by_xpath("//input[@name='submit']").click()
    #     time.sleep(3)
        # driver.close()

__main__()
































