Function AutoLogin_Initialize(msgPort As Object, userVariables As Object, bsp As Object)

    print "AutoLogin Initialize"

    AutoLogin = newAutoLogin(msgPort, userVariables, bsp)

    return AutoLogin

End Function


Function newAutoLogin(msgPort As Object, userVariables As Object, bsp As Object)

    s = {}

    s.objectName = "AutoLogin_object"
    s.msgPort = msgPort
    s.userVariables = userVariables
    s.bsp = bsp
    s.htmlwidget = invalid

    s.ProcessEvent = AutoLogin_ProcessEvent

    return s

End Function


Function AutoLogin_ProcessEvent(event As Object) as boolean

    if type(event) = "roHtmlWidgetEvent" then

        eventData = event.GetData()

        if type(eventData) = "roAssociativeArray" then

            if eventData.reason = "load-finished" then

                print "HTML LOAD FINISHED"

                m.htmlwidget = FindHTMLWidget(m.bsp)

                if m.htmlwidget <> invalid then
                    print "Injecting login.js"
                    m.htmlwidget.InjectJavaScript("SD:/login.js")
                else
                    print "HTML WIDGET NOT FOUND"
                end if

            end if

        end if

    end if

    return false

End Function


Function FindHTMLWidget(bsp)

    for each baZone in bsp.sign.zonesHSM

        if baZone.loadingHtmlWidget <> invalid then
            return baZone.loadingHtmlWidget
        end if

    end for

    return invalid

End Function
